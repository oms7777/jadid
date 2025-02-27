interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <img
      src={src || "/default-avatar.png"} // ✅ Use a fallback if `src` is undefined
      alt="User Avatar"
      className="w-10 h-10 rounded-full"
    />
  );
};

export default Avatar;
