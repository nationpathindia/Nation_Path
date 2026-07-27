"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro CMS Table Component
//////////////////////////////////////////////////////////////

import {
  ReactNode,
} from "react";


interface AstroTableColumn<T> {

  key: keyof T | string;

  label: string;

  render?: (
    item: T
  ) => ReactNode;

}


interface AstroTableProps<T> {

  columns: AstroTableColumn<T>[];

  data: T[];

  loading?: boolean;

  emptyMessage?: string;

}


export default function AstroTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found",
}: AstroTableProps<T>) {


  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-950
      "
    >

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            min-w-full
            divide-y
            divide-slate-800
          "
        >

          <thead
            className="
              bg-slate-900
            "
          >

            <tr>

              {
                columns.map(
                  (column)=>(
                    <th
                      key={
                        String(column.key)
                      }
                      className="
                        px-5
                        py-4
                        text-left
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                    >

                      {column.label}

                    </th>
                  )
                )
              }

            </tr>

          </thead>



          <tbody
            className="
              divide-y
              divide-slate-800
            "
          >


            {
              loading ? (

                <tr>

                  <td
                    colSpan={
                      columns.length
                    }
                    className="
                      px-5
                      py-10
                      text-center
                      text-slate-400
                    "
                  >

                    Loading...

                  </td>

                </tr>


              ) : data.length === 0 ? (


                <tr>

                  <td
                    colSpan={
                      columns.length
                    }
                    className="
                      px-5
                      py-10
                      text-center
                      text-slate-400
                    "
                  >

                    {emptyMessage}

                  </td>

                </tr>


              ) : (


                data.map(
                  (item,index)=>(

                    <tr
                      key={index}
                      className="
                        transition
                        hover:bg-slate-900/70
                      "
                    >

                      {
                        columns.map(
                          (column)=>(

                            <td
                              key={
                                String(column.key)
                              }
                              className="
                                px-5
                                py-4
                                text-sm
                                text-slate-200
                              "
                            >

                              {
                                column.render
                                  ?
                                  column.render(item)
                                  :
                                  String(
                                    item[
                                      column.key as keyof T
                                    ] ?? "-"
                                  )
                              }

                            </td>

                          )
                        )
                      }

                    </tr>

                  )

                )

              )
            }


          </tbody>

        </table>


      </div>


    </div>

  );

}