import LoginButton from "./LoginButton"
function Landing() {
  return (
    <div className="min-w-0 h-screen text-black absolute w-full">
      <div className="flex flex-col items-center justify-center pt-28 w-full gap-4 ">
        <div className="font-semibold text-white text-5xl max-w-xl selection:text-black selection:bg-neutral-300 tracking-wide leading-16">
          Attention span less than that of a Goldfish ?
        </div>
        <div className="text-white text-md flex justify-start max-w-xl w-full pl-1.5">
          <h3>I wont fix it , duh . this is another note making app</h3>
        </div>
        <div className="flex justify-center p-3.5 m-8">
        <LoginButton />
      </div>
      </div>
    </div>
  )
}

export default Landing