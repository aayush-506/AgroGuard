// #00745 -> background
type Props = {
    treatment: string
    highlight?: string
}
export default function Card({ treatment, highlight }: Props) {
    return (
        <div
            className={`h-[59px] ${
                highlight ? `bg-[${highlight}]` : "bg-green-600 dark:bg-[#244935]"
            } rounded-[5px] p-[10px] flex justify-center items-center overflow-hidden cursor-pointer shadow-card`}
        >
            <p className="text-white">{treatment}</p>
        </div>
    )
}
