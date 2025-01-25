import type { JSX } from 'react'

interface ArrowIcon {
  direction?: 'left' | 'right' | 'diagonal-up'
  key?: string
}

export const ArrowIcon = ({
  direction = 'right',
  key = 'arrow',
}: ArrowIcon): JSX.Element => {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '16',
    height: '16',
    fill: 'none',
  }

  if (direction === 'left') {
    return (
      <svg
        key={key}
        {...svgProps}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-0 h-4 w-4 flex-shrink-0 text-primary/50 transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:text-blue-600 sm:mr-2"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    )
  }

  if (direction === 'right') {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 16 16"
        className="mr-0 h-5 w-5 flex-shrink-0 text-primary/50 transition-all duration-200 ease-in-out group-hover:translate-x-2 group-hover:text-blue-600 sm:mr-2"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M1 8.00002C1 7.86741 1.05268 7.74024 1.14645 7.64647C1.24021 7.5527 1.36739 7.50002 1.5 7.50002H13.293L10.146 4.35402C10.0521 4.26013 9.99937 4.1328 9.99937 4.00002C9.99937 3.86725 10.0521 3.73991 10.146 3.64602C10.2399 3.55213 10.3672 3.49939 10.5 3.49939C10.6328 3.49939 10.7601 3.55213 10.854 3.64602L14.854 7.64602C14.9006 7.69247 14.9375 7.74764 14.9627 7.80839C14.9879 7.86913 15.0009 7.93425 15.0009 8.00002C15.0009 8.06579 14.9879 8.13091 14.9627 8.19165C14.9375 8.2524 14.9006 8.30758 14.854 8.35402L10.854 12.354C10.7601 12.4479 10.6328 12.5007 10.5 12.5007C10.3672 12.5007 10.2399 12.4479 10.146 12.354C10.0521 12.2601 9.99937 12.1328 9.99937 12C9.99937 11.8672 10.0521 11.7399 10.146 11.646L13.293 8.50002H1.5C1.36739 8.50002 1.24021 8.44734 1.14645 8.35357C1.05268 8.25981 1 8.13263 1 8.00002Z"
        />
      </svg>
    )
  }

  // diagonal-up
  return (
    <svg
      {...svgProps}
      viewBox="0 0 16 16"
      className="mr-0 h-4 w-4 flex-shrink-0 text-primary/50 transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600 sm:mr-2"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2.5C14 2.36739 13.9473 2.24021 13.8535 2.14645C13.7598 2.05268 13.6326 2 13.5 2H7.49999C7.36738 2 7.24021 2.05268 7.14644 2.14645C7.05267 2.24021 6.99999 2.36739 6.99999 2.5C6.99999 2.63261 7.05267 2.75979 7.14644 2.85355C7.24021 2.94732 7.36738 3 7.49999 3H12.293L2.14599 13.146C2.0995 13.1925 2.06263 13.2477 2.03747 13.3084C2.01231 13.3692 1.99936 13.4343 1.99936 13.5C1.99936 13.5657 2.01231 13.6308 2.03747 13.6916C2.06263 13.7523 2.0995 13.8075 2.14599 13.854C2.19248 13.9005 2.24767 13.9374 2.30841 13.9625C2.36915 13.9877 2.43425 14.0006 2.49999 14.0006C2.56573 14.0006 2.63083 13.9877 2.69157 13.9625C2.75231 13.9374 2.8075 13.9005 2.85399 13.854L13 3.707V8.5C13 8.63261 13.0527 8.75979 13.1464 8.85355C13.2402 8.94732 13.3674 9 13.5 9C13.6326 9 13.7598 8.94732 13.8535 8.85355C13.9473 8.75979 14 8.63261 14 8.5V2.5Z"
      />
    </svg>
  )
}
