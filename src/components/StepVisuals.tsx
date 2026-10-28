import Image from "next/image";
import { images } from "@/content";

// Small, true-to-life fragments of what Stringline produces. Every name and time is an example.

const CALL: { who: "a" | "h"; text: string }[] = [
  { who: "a", text: "Thanks for calling [Your company]. I’m the after-hours assistant, and this call may be recorded. Are you calling about a new project?" },
  { who: "h", text: "Yeah, we want a patio out back. Maybe a fire pit." },
  { who: "a", text: "Great. What’s the ZIP code for the project?" },
  { who: "h", text: "46220." },
  { who: "a", text: "Do you have a rough budget in mind, and when you’d like it built?" },
  { who: "h", text: "Fifteen to twenty-five thousand. This summer." },
];

const CHECKS = ["In your service area", "Over your budget floor", "Building this season"];

// The phone side, start to finish: disclosure, qualifying, two real times, booked.
export function CallVisual() {
  return (
    <div className="frag frag--call" data-ui>
      <p className="frag__meta">Phone call · Dana R. · Example</p>
      <div className="frag__event">Tue 10:47 PM · forwarded after hours</div>
      <ol className="call">
        {CALL.map((l, i) => (
          <li key={i} className={`call__line call__line--${l.who}`}>
            <span className="call__who">{l.who === "a" ? "Assistant" : "Dana"}</span>
            <p>{l.text}</p>
          </li>
        ))}
      </ol>
      <ul className="call__checks" aria-label="Checked against your rules">
        {CHECKS.map((c) => (
          <li key={c}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {c}
          </li>
        ))}
      </ul>
      <ol className="call">
        <li className="call__line call__line--a">
          <span className="call__who">Assistant</span>
          <p>You’re a great fit for a free design consult. I have Thursday at 9:00 AM or Friday at 1:30 PM. Which works?</p>
        </li>
        <li className="call__line call__line--h">
          <span className="call__who">Dana</span>
          <p>Thursday at 9.</p>
        </li>
        <li className="call__line call__line--a">
          <span className="call__who">Assistant</span>
          <p>You’re booked for Thursday at 9:00 AM. I’ll text you a confirmation and a link to send a few photos of your yard.</p>
        </li>
      </ol>
      <p className="frag__status">Booked · Thu 9:00 AM · on Mike’s calendar</p>
      <p className="frag__time">If a caller asks for a person, it transfers to your number or takes a message and texts you.</p>
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
      <p className="frag__time">Booked by Stringline overnight: Thu 9:00 at 10:51 PM, Thu 1:00 at 6:14 AM</p>
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
          <dd>Patio and walkway, fire pit, room for 8</dd>
        </div>
        <div>
          <dt>Range shown</dt>
          <dd>$14,500–$21,500</dd>
        </div>
        <div>
          <dt>Confirmed</dt>
          <dd>Wed 9:04 AM</dd>
        </div>
      </dl>
    </div>
  );
}
