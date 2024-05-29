
interface Props {
   title: string;
   subtitle?: string;
   className?: string;
}

export const Titles = ({ title, subtitle, className }: Props) => {
   return (
      <div className={`mt-3 ${className}`}>
         <h1 className={`text-4xl mb-1 mt-5`}>
            {title}
         </h1>

         {
            subtitle && (
               <span className='text-sm'>{subtitle}</span>
            )
         }

      </div>
   )
}