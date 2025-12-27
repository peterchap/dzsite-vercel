import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { GlobalCoverageData, PositionType, CoveragePoint } from '@/sanity/types';

type GlobalCoverageProps = GlobalCoverageData & { _type?: string; _key?: string };

const positionClasses: Record<PositionType, string> = {
  'top': 'bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2',
  'top-right': 'bottom-[calc(90%+5px)] left-[calc(90%+5px)]',
  'right': 'top-1/2 left-[calc(110%+8px)] -translate-y-1/2',
  'bottom-right': 'top-[calc(100%-5px)] left-[calc(110%+5px)]',
  'bottom': 'top-[calc(100%+8px)] left-1/2 -translate-x-1/2',
  'bottom-left': 'top-[calc(100%-5px)] right-[calc(110%+5px)]',
  'left': 'top-1/2 right-[calc(110%+8px)] -translate-y-1/2',
  'top-left': 'bottom-[calc(90%+5px)] right-[calc(90%+5px)]',
};

export default function GlobalCoverageSection(props: GlobalCoverageProps & { isDark?: boolean }) {
  if (!props) return null;
  const { title, subtitle, worldImage, coveragePoints, footerLine, opsNote, isDark } = props;
  const points: CoveragePoint[] = Array.isArray(coveragePoints) ? coveragePoints : [];

  return (
    <section className={`py-24 overflow-hidden ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
        )}
        {subtitle && (
          <p className="text-xl text-gray-600 text-center mb-24 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="relative w-72 h-72 mx-auto mt-40 mb-40 flex items-center justify-center">
          {/* Center container for the world image */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* World image - circular */}
            {worldImage && (
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(worldImage).url()}
                  alt="Global Coverage"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Coverage points positioned around the circle */}
            {points.map(
              (point: CoveragePoint, index: number) => (
                <div
                  key={index}
                  className={`absolute ${positionClasses[point.position]} z-10`}
                >
                  <div className={`bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-gray-100/50 transition-transform hover:scale-105 ${point.position === 'bottom' ? 'min-w-[280px]' : 'min-w-[180px]'}`}>
                    <div className="text-sm text-slate-900 font-bold text-center line-clamp-2 leading-tight whitespace-nowrap">
                      {point.label}
                    </div>
                    <div className="text-xs text-slate-500 text-center mt-1.5 line-clamp-3 leading-normal">
                      {point.value}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {(footerLine || opsNote) && (
          <div className="mt-40 text-center max-w-2xl mx-auto border-t border-gray-200 pt-12">
            {footerLine && (
              <p className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                {footerLine}
              </p>
            )}
            {opsNote && (
              <p className="text-sm text-slate-500 font-medium">
                <span className="text-blue-600 mr-2">Note:</span>
                {opsNote}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}