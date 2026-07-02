import arrowImg from "@/assets/arrow-bullet.png";

interface ArrowBulletProps {
  size?: number;
}

export const ArrowBullet = ({ size = 28 }: ArrowBulletProps) => (
  <img src={arrowImg} alt="" className="shrink-0" style={{ width: size, height: size }} />
);
