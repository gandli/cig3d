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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-md w-[90%] bg-white/95 dark:bg-black/90 backdrop-blur-sm rounded-lg shadow-lg p-4 z-10">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {annotation.title}
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {annotation.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
