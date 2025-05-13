import SharedBtn from "../../SharedBtn";
import "./topbar.css";
export default function Topbar() {
  return (
    <section className="top-bar py-5 my-5">
      <div className="container py-5 d-flex text-center text-lg-start flex-column flex-lg-row justify-content-between align-items-center">
        <div className="heading">
          <h2 className="h1 my-2">Start your free trial today!</h2>
          <p className="text-white-50">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of StreamVibe.
          </p>
        </div>
        <SharedBtn>Start a Free Trail</SharedBtn>
      </div>
    </section>
  );
}
