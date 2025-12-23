function getColorFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

function Avatar({ name, size = 40 }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bgColor = getColorFromString(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
      }}
      className="rounded-full flex items-center justify-center text-white font-bold select-none"
    >
      {initials}
    </div>
  );
}

export default Avatar;
