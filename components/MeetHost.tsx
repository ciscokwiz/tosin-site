import { site } from "@/data/site";
import { meetPhotos } from "@/data/photos";
import { Photo } from "./Photo";
import { Words } from "./Words";

/* "Meet the host": photos on the left, the sentence on the right. The
   section is pinned while you scroll; the words light up, and each part
   of the sentence reveals its own photo (MotionEngine → [data-scrolly]).
   Without JavaScript or with reduced motion it is a normal, still section. */
export function MeetHost() {
  return (
    <section className="meet" aria-labelledby="meet-title">
      <div className="meet__track" data-scrolly>
      <div className="meet__sticky">
        <div className="wrap meet__grid">
          <div className="meet__photos" data-active="0">
            {meetPhotos.map((p, i) => (
              <figure key={p.src} className={`meet__photo meet__photo--${i + 1}`}>
                <Photo photo={p} sizes="(min-width: 900px) 30vw, 50vw" />
              </figure>
            ))}
          </div>
          <div className="meet__copy">
            <h2 id="meet-title" className="eyebrow">Meet the host</h2>
            <Words
              className="meet__text"
              text={`${site.person} is a master communicator, event host and convener of | *unforgettable moments.* A psychologist by training, | he reads a room before he speaks to it, and brings more than charisma. He delivers *impact.*`}
            />
          </div>
        </div>
      </div>
      </div>
      <div className="wrap">
        <dl className="creds">
          <div><dt>Degree</dt><dd>Psychology, Obafemi Awolowo University</dd></div>
          <div><dt>Trained in</dt><dd>Emotional intelligence</dd></div>
          <div><dt>Trained in</dt><dd>Product management</dd></div>
          <div><dt>Known as</dt><dd>&ldquo;{site.nickname}&rdquo;</dd></div>
        </dl>
      </div>
    </section>
  );
}
