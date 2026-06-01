import { getPageByUri } from '../../lib/wordpress';
import HakkimizdaClient from './client';

export const metadata = {
    title: 'Hakkımızda | Grove Media Creative',
    description: 'Grove Media Creative hakkında bilgi edinin.',
    alternates: {
        canonical: 'https://grovemediacreative.com.tr/hakkimizda',
    },
};

export default async function HakkimizdaPage() {
    const page = await getPageByUri('/hakkimizda/');

    return <HakkimizdaClient page={page} />;
}
