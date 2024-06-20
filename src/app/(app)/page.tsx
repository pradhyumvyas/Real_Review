import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import message from '@/Asset/Data/Messages.json';

const page = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
      <section>
        <h1 className="text-3xl font-bold text-center">Welcome to Real Review</h1>
        <p className="text-center mt-4">Real Review is a platform where you can share your honest opinion about products and services.</p>
      </section>
        <div className="flex justify-between w-100">
        <Carousel className="w-full max-w-xs mt-6">
          <CarouselContent>
            {message.map((message, index) => (
              <CarouselItem key={index +5}>
                <Card className="card-bordered bg-gray-900 text-white">
                  <CardHeader>
                    <h2 className="text-lg font-semibold">{message.title}</h2>
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{message.content}</span>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm text-muted-foreground">{message.received}</span>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-800" />
          <CarouselNext className="bg-gray-800" />
        </Carousel>
          <Carousel className="w-full max-w-xs mt-6">
          <CarouselContent>
            {message.map((message, index) => (
              <CarouselItem key={index}>
                <Card className="card-bordered bg-gray-900 text-white">
                  <CardHeader>
                    <h2 className="text-lg font-semibold">{message.title}</h2>
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{message.content}</span>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm text-muted-foreground">{message.received}</span>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-800" />
          <CarouselNext className="bg-gray-800" />
        </Carousel>
      </div>
      {/* <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div> */}
    </div>
  )
}

export default page