import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-8">
        <div className="h-20"></div>
          <div className="text-center mb-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Museum-quality prints and educational materials that support wildlife conservation
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-1">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">My Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  My name is Narong Suwannarong. I was born in Sawang Daen Din District, Sakon Nakhon Province, Thailand. I earned my Bachelor’s degree in Engineering from King Mongkut’s Institute of Technology Ladkrabang.
                </p>
                <p>
                  In 1992, I began my career as an engineer while also setting off on a journey into nature—watching birds, butterflies, and wildlife. I’ve always had a deep interest in wildlife photography and bookmaking. About ten years ago, I transitioned into working primarily as a wildlife photographer.
                </p>
                <p>
                  I’ve spent most of my time learning and photographing animals in places like Phu Khieo, Khao Yai, and Huai Kha Khaeng. I move slowly, in sync with the rhythm of wild creatures, and often spend years photographing and collecting information before a single species' story takes shape. I share my wildlife photography in the hope that people in Thailand will become more familiar with and understand life in the forest—so they may develop love, care, and awareness of the importance of nature.
                </p>
                <p>
                  I first visited the Huai Kha Khaeng Wildlife Sanctuary in 1994, and have continued returning periodically over the past three decades to observe and photograph wildlife. My work there was eventually compiled into a book on the sanctuary’s animals.
                </p>
              </div>
              <div className="mt-8 flex space-x-4">
                <Link
                  href="https://www.instagram.com/narong_suwannarong/"
                  className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/narong.suwannarong"
                  className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="space-y-6 max-w-md mx-auto md:mx-12">
              <div className="overflow-hidden">
                <Image
                  src="/images/About/506470185_9760293294024984_8720796233752892488_n.jpg"
                  alt="Wildlife photographer portrait"
                  width={300}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden">
                  <Image
                    src="/images/About/506470185_9760293294024984_8720796233752892488_n.jpg?height=400&width=300"
                    alt="On location in the Arctic"
                    width={200}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <Image
                    src="/images/About/506470185_9760293294024984_8720796233752892488_n.jpg?height=400&width=300"
                    alt="Photographing wildlife"
                    width={200}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Equipment & Approach</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-xl font-medium">My Gear</h3>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Primary Camera: Canon EOS R5</li>
                <li>Secondary Camera: Sony Alpha a9 II</li>
                <li>Lenses: 600mm f/4, 100-400mm f/4.5-5.6, 24-70mm f/2.8</li>
                <li>Underwater Housing: Aquatica for specific marine expeditions</li>
                <li>Tripods: Gitzo carbon fiber series</li>
                <li>Drones: DJI Mavic 3 Pro for aerial perspectives</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium">My Approach</h3>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  My photography philosophy centers on patience, respect, and minimal intervention. I often spend weeks
                  in a single location, learning animal behaviors and waiting for the perfect moment rather than forcing
                  an interaction.
                </p>
                <p>
                  I believe in ethical wildlife photography that prioritizes the welfare of animals and their habitats.
                  This means maintaining appropriate distances, never baiting wildlife, and being conscious of my
                  environmental impact during expeditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Awards & Recognition</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                award: "Wildlife Photographer of the Year",
                category: "Animal Portraits",
                year: "2022",
                organization: "Natural History Museum",
              },
              {
                award: "Environmental Photography Award",
                category: "Conservation Impact",
                year: "2021",
                organization: "United Nations Environment Programme",
              },
              {
                award: "National Geographic Explorer",
                category: "Photography Fellow",
                year: "2020-Present",
                organization: "National Geographic Society",
              },
              {
                award: "International Conservation Photographer",
                category: "Marine Life",
                year: "2019",
                organization: "Ocean Geographic Society",
              },
              {
                award: "Fine Art Photography Awards",
                category: "Wildlife",
                year: "2018",
                organization: "FAPA",
              },
              {
                award: "Sony World Photography Awards",
                category: "Natural World",
                year: "2017",
                organization: "World Photography Organisation",
              },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h3 className="font-medium">{item.award}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.category} • {item.year}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{item.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Let's Connect</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Interested in collaborations, workshops, or licensing my work? I'm always open to discussing new projects
              and opportunities.
            </p>
            <div className="mt-8">
              <Button asChild className="rounded-none">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
