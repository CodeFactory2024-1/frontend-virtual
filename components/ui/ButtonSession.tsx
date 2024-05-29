import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from 'next/link';

import React from 'react'


interface btnProps{
    path: string,
    content: string
}

const ButtonSession = ({ path, content}: btnProps) => {
  return (
    <Link 
        href={path}
        className='flex items-center justify-center gap-1 w-[125px] h-[32px] bg-white rounded-3xl text-gray-400 text-sm text-center'
    >  
        <AccountCircleOutlinedIcon />
        {content}
    </Link>
  )
}

export default ButtonSession