import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import Link from "next/link"
import React from "react"

interface btnProps {
  path: string
  content: string
}

const ButtonSession = ({ path, content }: btnProps) => {
  return (
    <Link
      href={path}
      className="flex h-[32px] w-[125px] items-center justify-center gap-1 rounded-3xl bg-white text-center text-sm text-gray-400"
    >
      <AccountCircleOutlinedIcon />
      {content}
    </Link>
  )
}

export default ButtonSession
