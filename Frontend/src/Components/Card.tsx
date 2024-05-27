type Props = {
    treatment: string
    highlight?: string
}
export default function Card({ treatment, highlight }: Props) {
    return (
        <div
            className={`h-[59px] ${
                highlight ? `bg-[${highlight}]` : "bg-[#00745F]"
            } rounded-[13px] p-[10px] flex justify-center items-center overflow-hidden cursor-pointer shadow-card`}
        >
            <p className="text-white">
                {treatment}
            </p>
        </div>
    )
}