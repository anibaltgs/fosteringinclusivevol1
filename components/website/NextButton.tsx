import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface NextButtonProps {
  href: string;
  text: string;
}

const NextButton: React.FC<NextButtonProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <button className='inline-flex items-center rounded-md border border-zinc-100 bg-zinc-50 px-2.5 py-1.5 text-sm text-zinc-950 hover:bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600'>
        {text}
        <ChevronRight className='ml-1.5 h-4 w-4 fill-zinc-950 dark:fill-zinc-50' />
      </button>
    </Link>
  );
};

export default NextButton;
