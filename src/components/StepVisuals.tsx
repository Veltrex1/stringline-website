import Image from "next/image";
import { images } from "@/content";

// Small, true-to-life fragments of what Stringline produces. Every name and time is an example.

export function ThreadVisual() {
  return (
    <div className="frag" data-ui>
      <p className="frag__meta">Text messages · Dana R. · Example</p>
      <div className="frag__event">New web form · Tue 10:47 PM</div>
      <p className="bubble bubble--out">
        Hi Dana, thanks for reaching out to Your Company about a patio. I can get you on the calendar for a free design consult. A few
        quick questions first?
      </p>
      <p className="frag__time">10:47 PM · 38 seconds after the form</p>
      <p className="bubble bubble--in">Sure, go ahead!</p>
    </div>
  );
}

const SLOTS = [
  { time: "8:00", day: [null, null, "Site walk"] },
  { time: "9:00", day: [null, "Dana · Patio", null] },
  { time: "10:00", day: ["Estimate", null, null] },
  { time: "11:00", day: [null, null, null] },
  { time: "1:00", day: [null, "Kyle · Wall", "Estimate"] },
];

export function CalendarVisual() {
  return (
    <div className="frag frag--cal" data-ui>
      <p className="frag__meta">Mike’s calendar · Example</p>
      <table className="cal">
        <thead>
          <tr>
            <th scope="col" aria-label="Time" />
            <th scope="col">Wed 10</th>
            <th scope="col">Thu 11</th>
            <th scope="col">Fri 12</th>
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s.time}>
              <th scope="row">
                {s.time}
              </th>
              {s.day.map((e, i) => (
                <td key={i}>
                  {e && <span className={e.includes("·") ? "cal__new" : "cal__old"}>{e}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="frag__time">Booked by Stringline overnight: Thu 9:00 at 10:52 PM, Thu 1:00 at 6:14 AM</p>
    </div>
  );
}

export function BriefVisual() {
  return (
    <div className="frag frag--brief" data-ui>
      <p className="frag__meta">Consult brief · Thu 9:00 AM · Example</p>
      <Image
        src={images.concept.src}
        alt=""
        width={2400}
        height={1177}
        sizes="(max-width: 900px) 100vw, 640px"
        className="brief__img"
        unoptimized={images.concept.src.endsWith(".svg")}
      />
      <dl className="brief">
        <div>
          <dt>Homeowner</dt>
          <dd>Dana R. · 46220</dd>
        </div>
        <div>
          <dt>Wants</dt>
          <dd>Patio with a fire pit, room for 8</dd>
        </div>
        <div>
          <dt>Range shown</dt>
          <dd>$9,000–$13,500</dd>
        </div>
        <div>
          <dt>Confirmed</dt>
          <dd>Wed 9:04 AM</dd>
        </div>
      </dl>
    </div>
  );
}
