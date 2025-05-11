import Image from 'next/image';
import { notFound } from 'next/navigation';

interface AboutParams {
  params: { locale: string }
}

export default async function AboutPage({ params }: AboutParams) {
  let messages;
  try {
    messages = await import(`./${params.locale}.json`).then(mod => mod.default);
  } catch {
    // fallback or 404
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{messages.title}</h1>
        <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-indigo-100">
          <Image
            src="/images/me.jpg"
            alt="Primavera"
            width={192}
            height={192}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="prose prose-lg text-gray-600 max-w-2xl mx-auto">
          <p className="text-xl">{messages.intro}</p>
          <p>{messages.bio1}</p>
          <p>{messages.bio2}</p>
        </div>
      </div>
    </div>
  );
}
