"use client";
type Props = {
  setRead: (read: boolean) => void;
};
export default function ReadAboutIt({ setRead }: Props) {
  return (
    <div className="max-w-screen-lg">
      <div>
        {`After thinking about what project to do, I got excited about using AI
        for something fun. So, I made a website where people have to smile to
        get in. Site with AI It's something I've wanted to do for a while, and
        I'm happy with how it turned out!`}
      </div>
      <button
        className="mt-5 rounded-lg bg-secondary p-3"
        onClick={() => {
          setRead(true);
        }}
      >
        {`Let's go`}
      </button>
    </div>
  );
}
