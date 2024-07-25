export default function CountDate({
  date,
}: {
  date: number
}) {
  return (
    <div className="CountDate flex justify-center gap-8 max-sm:gap-6 items-center w-full">
      <div className={`flex flex-col item-center justify-center ${date > 0 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/fire.svg" alt="fire" className="w-8 h-8" />
        <p className="text-md mt-1">1</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 1 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/fire.svg" alt="fire" className="w-8 h-8" />
        <p className="text-md mt-1">2</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 2 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/fire.svg" alt="fire" className="w-8 h-8" />
        <p className="text-md mt-1">3</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 3 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/fire.svg" alt="fire" className="w-8 h-8" />
        <p className="text-md mt-1">4</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 4 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/fire.svg" alt="fire" className="w-8 h-8" />
        <p className="text-md mt-1">5</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 4 ? "opacity-100" : "opacity-50"}`}>
        {date <= 4 ? (
          <img src="/image/icon/lock.svg" alt="lock" className="w-7 h-7 mt-1" />
        ) : (
          <img
            src="/image/icon/unlock.svg"
            alt="unlock"
            className="w-7 h-7 mt-1"
          />
        )}

        <p className="text-md mt-1">2X</p>
      </div>
    </div>
  );
}
