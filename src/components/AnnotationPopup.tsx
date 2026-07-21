import type { Annotation } from '@/types';

interface AnnotationPopupProps {
  annotation: Annotation | null;
  onClose: () => void;
}

/**
 * 防伪标注弹窗，HTML 浮层在 Canvas 上方
 */
export function AnnotationPopup({ annotation, onClose }: AnnotationPopupProps) {
  if (!annotation) return null;

  return (
    <div className="fixed md:absolute bottom-0 md:bottom-4 left-0 md:left-1/2 md:-translate-x-1/2 right-0 md:right-auto md:max-w-md md:w-[90%] bg-white/95 dark:bg-black/90 backdrop-blur-sm md:rounded-lg rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:shadow-lg p-4 md:p-4 pb-6 md:pb-4 z-10 safe-bottom">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-gray-100">
            {annotation.title}
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {annotation.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 -mr-1"
          aria-label="关闭"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
