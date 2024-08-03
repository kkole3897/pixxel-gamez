import { Metadata } from 'next';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import * as styles from './page.css';
import { GameDescription, PriceHistoryFetcher } from '@/widgets/game-detail';
import { Core } from '@/shared/api';
import { createClient } from '@/shared/lib/supabase/server';
import { gameQueryKeys } from '@/entities/game';
import { GameCatalogSection, ReviewSection } from '@/widgets/game-detail';
import { wishListQueryKeys } from '@/entities/wish-list';

type PageProps = {
  params: { gameId: string };
};

const queryClient = new QueryClient();

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { gameId } = params;

  const core = new Core(createClient());

  const { game } = await queryClient.fetchQuery({
    queryKey: gameQueryKeys.detail(params.gameId).queryKey,
    queryFn: () => core.games.getGame(params.gameId),
  });

  const generatedTitle = game?.titleKo ?? game?.title ?? gameId;

  return {
    title: `${generatedTitle} - Pixxel Game`,
    openGraph: {
      title: `${generatedTitle} - Pixxel Game`,
    },
    twitter: {
      title: `${generatedTitle} - Pixxel Game`,
    },
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const core = new Core(createClient());
  await queryClient.prefetchQuery({
    queryKey: gameQueryKeys.detail(params.gameId).queryKey,
    queryFn: () => core.games.getGame(params.gameId),
  });
  await queryClient.prefetchQuery({
    queryKey: gameQueryKeys.lowestPriceRanks(params.gameId).queryKey,
    queryFn: () => core.games.getLowestPriceRanks(params.gameId),
  });
  await queryClient.prefetchQuery({
    queryKey: wishListQueryKeys.getWishlistItemByGamePublicId(params.gameId)
      .queryKey,
    queryFn: () => core.wishlist.getWishlistItemByGamePublicId(params.gameId),
  });

  const { game } = await queryClient.fetchQuery({
    queryKey: gameQueryKeys.detail(params.gameId).queryKey,
    queryFn: () => core.games.getGame(params.gameId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <GameCatalogSection
          gamePublicId={params.gameId}
          className={styles.contentBox}
        />
        <section className={styles.contentBox}>
          <h3 className={styles.contentTitle}>최저가추이</h3>
          <PriceHistoryFetcher gamePublicId={params.gameId} />
        </section>
        {game.description && (
          <section className={styles.contentBox}>
            <h3 className={styles.contentTitle}>게임 설명</h3>
            <GameDescription gamePublicId={params.gameId} />
          </section>
        )}
        {(game.type === 'game' || game.type === 'dlc') && (
          <section className={styles.contentBox}>
            <h3 className={styles.contentTitle}>리뷰</h3>
            <ReviewSection gamePublicId={params.gameId} />
          </section>
        )}
      </div>
    </HydrationBoundary>
  );
}
