import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from '@/components/core/carousel';

export function CarouselBasic() {
  const items = [
    {
      image: '1pausas.png',
      text: 'Pausas: Implementar pausas regulares puede mejorar la concentración y productividad.',
    },
    {
      image: '2objetos.png',
      text: 'Objetos: Utilizar objetos físicos puede ayudar en el aprendizaje y la comprensión.',
    },
    {
      image: '3almohada.png',
      text: 'Almohada: Asegurar un buen descanso es crucial para el aprendizaje y la memoria.',
    },
    {
      image: '4escritura.png',
      text: 'Escritura: La práctica de la escritura a mano puede mejorar la retención de información.',
    },
    {
      image: '5adaptadores.png',
      text: 'Adaptadores: Usar herramientas adaptativas puede facilitar el aprendizaje para diversos estilos.',
    },
    {
      image: '6renglones.png',
      text: 'Renglones: Utilizar papel con líneas puede ayudar a organizar y estructurar la información.',
    },
    {
      image: '7agenda.png',
      text: 'Agenda: Mantener una agenda ayuda a organizar tareas y mejorar la gestión del tiempo.',
    },
    {
      image: '8metacognicion.png',
      text: 'Metacognición: Reflexionar sobre el propio aprendizaje puede mejorar la comprensión y retención.',
    },
    {
      image: '9espacios.png',
      text: 'Espacios: Crear un ambiente de aprendizaje adecuado puede potenciar la concentración.',
    },
    {
      image: '10relojes.png',
      text: 'Relojes: Gestionar el tiempo eficazmente es clave para un aprendizaje productivo.',
    },
    {
      image: '11checkin.png',
      text: 'Check-in: Realizar comprobaciones regulares puede ayudar a mantener el enfoque y la motivación.',
    },
    {
      image: '12material.png',
      text: 'Material: Seleccionar y organizar el material de estudio adecuado es fundamental.',
    },
    {
      image: '13recursos.png',
      text: 'Recursos: Utilizar una variedad de recursos puede enriquecer el proceso de aprendizaje.',
    },
  ];

  return (
    <div className='relative w-full max-w-md'>
      <Carousel>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.image} className='p-4'>
              <div className='flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800'>
                <Image
                  src={`/andamiajes/${item.image}`}
                  alt={item.image.split('.')[0].substring(1)}
                  width={300}
                  height={300}
                  objectFit='cover'
                />
              </div>
              <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
                {item.text}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation alwaysShow />
        <CarouselIndicator />
      </Carousel>
    </div>
  );
}
