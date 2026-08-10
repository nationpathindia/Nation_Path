import dynamic from "next/dynamic";


const AdRendererClient = dynamic(
  () => import("./AdRendererClient"),
  {
    ssr: false,
    loading: () => (
      <div
        className="
        w-full
        min-h-[90px]
        flex
        items-center
        justify-center
        text-xs
        text-gray-400
        "
      >
        Advertisement
      </div>
    ),
  }
);


interface Props {
  placement: string;
}


export default function AdRenderer({
  placement,
}: Props) {

  return (
    <AdRendererClient
      placement={placement}
    />
  );
}