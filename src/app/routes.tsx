import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SobrePage } from './pages/SobrePage';
import { AreasDeAtuacaoPage } from './pages/AreasDeAtuacaoPage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { FaqPage } from './pages/FaqPage';
import { VideosEducativosPage } from './pages/VideosEducativosPage';
import { ContatoPage } from './pages/ContatoPage';
import { RedeDeParceirosPage } from './pages/RedeDeParceirosPage';
import { HomologacaoPage } from './pages/LpHomologacaoPage';
import { DivorcioPage } from './pages/LpDivorcioPage';
import { ImoveisPage } from './pages/ImoveisPage';
import { GuardaPage } from './pages/LpGuardaPage';
import { PensaoPage } from './pages/LpPensaoPage';
import { InventarioPage } from './pages/LpInventarioPage';
import { UniaoEstavelPage } from './pages/LpUniaoEstavelPage';
import { PmesPage } from './pages/LpPmesPage';
import { InpiPage } from './pages/LpInpiPage';
import { PainelPage } from './pages/PainelPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'sobre', Component: SobrePage },
      { path: 'areas-de-atuacao', Component: AreasDeAtuacaoPage },
      { path: 'blog', Component: BlogPage },
      { path: 'blog/:slug', Component: BlogArticlePage },
      { path: 'faq', Component: FaqPage },
      { path: 'videos-educativos', Component: VideosEducativosPage },
      { path: 'contato', Component: ContatoPage },
      { path: 'rede-de-parceiros', Component: RedeDeParceirosPage },
      { path: 'homologacao-de-sentenca-estrangeira', Component: HomologacaoPage },
      { path: 'divorcio', Component: DivorcioPage },
      { path: 'imoveis', Component: ImoveisPage },
      { path: 'guarda-e-plano-de-convivencia', Component: GuardaPage },
      { path: 'pensao-alimenticia', Component: PensaoPage },
      { path: 'inventario-e-sucessoes', Component: InventarioPage },
      { path: 'uniao-estavel', Component: UniaoEstavelPage },
      { path: 'consultoria-empresarial-pmes', Component: PmesPage },
      { path: 'registro-de-marca-inpi', Component: InpiPage },
    ],
  },
  // Painel admin — rota independente sem Layout (navbar/footer)
  { path: '/painel', Component: PainelPage },
]);