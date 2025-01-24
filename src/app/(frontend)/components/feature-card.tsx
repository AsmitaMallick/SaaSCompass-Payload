import Image from "next/image"

interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

function FeatureCard({ title, description, imageSrc, imageAlt }: FeatureCardProps) {
  return (
    <div className="group">
      <div className="mb-6 aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}

export default FeatureCard