export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="p-1 w-[340px] border-[#1E3D4B] border-l radial-gradient border-[1px] rounded-full flex-shrink-0 flex items-center h-auto"
      >
        <div
          className="linear-gradient h-[6px] flex-shrink-0 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}
