"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface PollData {
  id: string;
  question: string;
  category?: string | null;
  totalVotes: number;
  expiresAt: string;
  options: PollOption[];
}

export default function PollOfDay() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [message, setMessage] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);

  /*
   * LOAD ONLY WHEN THE POLL IS NEAR THE VIEWPORT
   *
   * Poll of the Day is not critical homepage content.
   * Do not request /api/polls during initial page loading.
   */
  useEffect(() => {
    const element = containerRef.current;

    if (!element || loadedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadedRef.current) {
          return;
        }

        loadedRef.current = true;
        observer.disconnect();

        setLoading(true);

        const controller = new AbortController();

        fetch("/api/polls", {
          signal: controller.signal,
          cache: "force-cache",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(
                `Poll request failed: ${res.status}`
              );
            }

            return res.json();
          })
          .then((data) => {
            if (data?.success && data?.poll) {
              setPoll(data.poll);
            }
          })
          .catch((error: unknown) => {
            if (
              error instanceof DOMException &&
              error.name === "AbortError"
            ) {
              return;
            }

            console.error(
              "Poll load error",
              error
            );
          })
          .finally(() => {
            setLoading(false);
          });
      },
      {
        rootMargin: "400px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * SUBMIT VOTE
   */
  async function submitVote() {
    if (
      !poll ||
      !selected ||
      voting ||
      voted
    ) {
      return;
    }

    try {
      setVoting(true);
      setMessage("");

      const res = await fetch(
        `/api/polls/${poll.id}/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            optionId: selected,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setMessage(
          data.error ||
            "Vote failed"
        );

        return;
      }

      setPoll({
        ...poll,
        totalVotes:
          data.poll.totalVotes,
        options:
          data.poll.options,
      });

      setVoted(true);

      setMessage(
        "Your vote has been recorded"
      );
    } catch (error) {
      console.error(
        "Vote error",
        error
      );

      setMessage(
        "Something went wrong"
      );
    } finally {
      setVoting(false);
    }
  }

  /*
   * IMPORTANT:
   *
   * Keep the wrapper mounted even before the poll
   * loads so IntersectionObserver has a stable target.
   */
  return (
    <div
      ref={containerRef}
      className="w-full"
    >
      {loading && (
        <div
          className="
            w-full
            min-h-[220px]
            flex
            items-center
            justify-center
            text-sm
            text-gray-400
          "
          aria-hidden="true"
        >
          Loading poll...
        </div>
      )}

      {!loading && !poll && (
        <div className="hidden" />
      )}

      {poll && (
        <div
          className="
            w-full
            overflow-hidden
            border
            border-[#0B1F3A]/10
            bg-white
            shadow-sm
          "
        >
          {/* HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              bg-[#0B1F3A]
              px-6
              py-4
            "
          >
            <div>
              <div
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  font-semibold
                  text-[#EA661B]
                "
              >
                NationPath Opinion
              </div>

              <div
                className="
                  text-xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                Poll of the Day
              </div>
            </div>

            <a
              href="/polls"
              className="
                text-sm
                font-semibold
                text-white
                hover:text-[#EA661B]
                transition
              "
            >
              View Full Poll →
            </a>
          </div>

          {/* CONTENT */}
          <div
            className="
              p-6
            "
          >
            {poll.category && (
              <div
                className="
                  text-xs
                  uppercase
                  tracking-widest
                  text-[#EA661B]
                  font-semibold
                  mb-3
                "
              >
                {poll.category}
              </div>
            )}

            <h2
              className="
                text-2xl
                font-bold
                leading-snug
                text-[#0B1F3A]
                mb-6
              "
            >
              {poll.question}
            </h2>

            <div
              className="
                space-y-4
              "
            >
              {poll.options.map(
                (option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={
                      voted ||
                      voting
                    }
                    onClick={() => {
                      setSelected(
                        option.id
                      );
                      setMessage("");
                    }}
                    className={`
                      w-full
                      text-left
                      border
                      p-4
                      transition

                      ${
                        selected ===
                        option.id
                          ? "border-[#EA661B] bg-orange-50"
                          : "border-gray-200 hover:border-[#0B1F3A]"
                      }

                      ${
                        voted
                          ? "cursor-default"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        justify-between
                        items-center
                        gap-4
                      "
                    >
                      <span
                        className="
                          font-medium
                          text-gray-800
                        "
                      >
                        {option.text}
                      </span>

                      <span
                        className="
                          font-bold
                          text-[#0B1F3A]
                        "
                      >
                        {option.percentage}%
                      </span>
                    </div>

                    <div
                      className="
                        mt-3
                        h-2
                        bg-gray-100
                        overflow-hidden
                      "
                    >
                      <div
                        className="
                          h-full
                          bg-[#EA661B]
                          transition-all
                          duration-700
                        "
                        style={{
                          width: `${option.percentage}%`,
                        }}
                      />
                    </div>
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={submitVote}
              disabled={
                !selected ||
                voting ||
                voted
              }
              className={`
                mt-6
                w-full
                py-3
                text-sm
                font-semibold
                transition

                ${
                  selected && !voted
                    ? "bg-[#0B1F3A] text-white hover:bg-[#142B4A]"
                    : "bg-gray-200 text-gray-500"
                }
              `}
            >
              {voting
                ? "Submitting..."
                : voted
                ? "Vote Submitted ✓"
                : "Vote Now"}
            </button>

            {message && (
              <div
                className="
                  mt-3
                  text-center
                  text-sm
                  text-gray-500
                "
              >
                {message}
              </div>
            )}

            <div
              className="
                mt-6
                pt-5
                border-t
                border-gray-200
                flex
                justify-between
                text-sm
                text-gray-500
              "
            >
              <span>
                {poll.totalVotes.toLocaleString()}{" "}
                votes
              </span>

              <span>
                Ends:{" "}
                {new Date(
                  poll.expiresAt
                ).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

