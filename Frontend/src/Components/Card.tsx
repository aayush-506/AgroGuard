// #00745 -> background
type Props = {
    treatment: string
    highlight?: string
}
export default function Card({ treatment, highlight }: Props) {
    return (
        <div
            className={`h-[59px] ${
                highlight ? `bg-[${highlight}]` : "bg-[#5FA940]"
            } rounded-sm p-[10px] flex justify-center items-center overflow-hidden cursor-pointer `}
        >
            <p className="text-white">{treatment}</p>
        </div>
    )
}
