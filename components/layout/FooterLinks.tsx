interface FooterLinksProps {
  links: {
    label: string;
    href: string;
  }[];
}

export default function FooterLinks({
  links,
}: FooterLinksProps) {
  return (

    <div className="flex flex-wrap gap-x-6 gap-y-3">

      {links.map((link) => (

        <a
          key={link.href}
          href={link.href}
          className="
            text-sm
            text-gray-400
            hover:text-white
            transition-colors
          "
        >
          {link.label}
        </a>

      ))}

    </div>

  );
}