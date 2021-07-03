const LoadingIcon: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: "auto", display: "block" }}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <rect x="18" y="18" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="40" y="18" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.125s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="62" y="18" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.25s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="18" y="40" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.875s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="62" y="40" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.375s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="18" y="62" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.75s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="40" y="62" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.625s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="62" y="62" width="20" height="20" fill="#4bc4ec">
        <animate
          attributeName="fill"
          values="#ec5ca1;#4bc4ec;#4bc4ec"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.5s"
          calcMode="discrete"
        ></animate>
      </rect>
    </svg>
  );
};

export default LoadingIcon;