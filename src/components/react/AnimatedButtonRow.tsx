import { motion } from 'framer-motion';

interface ButtonData {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

interface Props {
  buttons: ButtonData[];
}

export default function AnimatedButtonRow({ buttons }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
    >
      {buttons.map((button, index) => (
        <motion.a
          key={button.href}
          href={button.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg tracking-wide transition-all shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.5)] transform hover:scale-105 w-full sm:w-auto ${
            button.variant === 'secondary'
              ? 'bg-gradient-to-br from-[#152433] via-[#1e3a5f] to-[#2c4f7c] text-white hover:from-[#1e3a5f] hover:via-[#2c4f7c] hover:to-[#3a5f8c] border-2 border-[#f59e0b]'
              : 'bg-gradient-to-br from-[#f59e0b] via-[#ea580c] to-[#f59e0b] text-white hover:from-[#ea580c] hover:via-[#d97706] hover:to-[#ea580c]'
          }`}
        >
          {button.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
