import AdRenderer from "@/components/ads/AdRendererClient";


interface SidebarAdProps {
  placement:string;
}



export default function SidebarAd({
  placement,
}:SidebarAdProps){


  return (

    <div

      className="
        py-6
        border-t
        border-b
        border-[var(--news-border)]
      "

    >

      <AdRenderer
        placement={placement}
      />

    </div>

  );


}