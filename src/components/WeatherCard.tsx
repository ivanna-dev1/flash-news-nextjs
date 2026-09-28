import Image from "next/image";
import { usePathname } from "next/navigation";

interface WeatherCardProps {
  image: string;
}
export default function WeatherCard({ image }: WeatherCardProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div
      // gap-2: the same space between the three parts - title, city/date
      // and icon/data - on any width.
      // Home page: the content is in the centre of the card. The padding is
      // 8px, but on the narrowest sidebar only 3px, like the news cards.
      // The sidebar is the narrowest (264px) when the window is under
      // ~860px. We check the window width, not the sidebar: a container
      // query on the sidebar would break its min width.
      // Category pages: no min width and no min height. The top padding
      // (10px) puts the title on one line with the photos of the category
      // cards. Sides and bottom: 3px, like the sidebar news cards, which
      // stand right under this card.
      className={`border border-gray-100 flex flex-col items-center gap-2 ${isHomePage
        ? // pt is ~4px smaller than the padding: the title has its own
          // space above the letters, so the letters start as far from the
          // top edge as the last line ends from the bottom edge.
          "justify-center min-h-48 col-span-2 p-[3px] pt-0 min-[860px]:p-2 min-[860px]:pt-1"
        : "pt-[14px] px-[3px] pb-0"
        }`}
    >
      {/* We tune the space the eye sees - between the letters, not between
          the boxes. A text box is taller than its letters (line height), so
          equal 8px gaps between boxes looked unequal.
          leading-none: the title box is as tall as its letters, so the
          space under the title is not bigger than the other spaces.
          Category pages: pt-[14px] keeps the title on one line with the
          photos of the category cards; pb-0 - the last text line has its
          own space under the letters, so the letters end ~4px from the
          bottom edge, the same as at the sides. */}
      <h1 className="text-center text-xl font-medium leading-none">Local Weather</h1>
      {/* Two fixed lines: the city, then the day and the date together.
          Short weekday ("Mon") because the month is short too ("Sept"). */}
      <div
        className={`flex flex-col items-center ${isHomePage ? "text-md" : "text-sm"}`}
      >
        <p>City: Lviv</p>
        <p>
          {new Date().toLocaleDateString("en-US", { weekday: "short" })}{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div
        // Category pages: w-full + justify-between - the icon stands at the
        // left padding and the data at the right one, so the space at the
        // sides is the same 3px as at the bottom on any sidebar width.
        // Home page: mt-1.5 - the big icon starts right at the top of its
        // box, so it needs a bit more space to look like the other gaps.
        className={`flex flex-row ${isHomePage ? "mt-1.5 w-full justify-center items-center gap-4" : "w-full justify-between items-center gap-1"}`}
      >
        {/* A fixed width + shrink-0: the icon keeps its size. Without a fixed
            width the browser thinks an image can get as narrow as 0 (images
            have max-width: 100%), so the smallest card width was counted
            without the icon, and the text went out of the card. */}
        <div className={`h-fit shrink-0 ${isHomePage ? "w-[100px]" : "w-[70px]"}`}>
          <Image
            src={image}
            alt="Weather"
            width={isHomePage ? 100 : 70}
            height={isHomePage ? 100 : 70}
          />
        </div>
        {/* "whitespace-nowrap": a long label pushed the number to the next
            line, which looked broken. Home page: full labels. Category
            pages: short labels, and translate="no" - a browser translator
            turns short words into wrong or long ones ("Hum" -> "Гул"). */}
        <div
          className="flex flex-col text-gray-800 text-sm justify-start items-start whitespace-nowrap"
          translate={isHomePage ? undefined : "no"}
        >
          <p>{isHomePage ? `Temperature: 25°C` : `Temp: 25°C`}</p>
          <p>{isHomePage ? `Feels like: 25°C` : `Feels: 25°C`}</p>
          <p>{isHomePage ? `Humidity: 50%` : `Hum: 50%`}</p>
          <p>Wind: 5m/s</p>
        </div>
      </div>
    </div>
  );
}
