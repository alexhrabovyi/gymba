import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import LinkWithArrow from '../common/LinkWithArrow/LinkWithArrow.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import newsCls from './NewsPreviews.module.scss';

export default function NewsPreview() {
  const { news } = useLoaderData();

  return (
    <article className={classNames(containerCls.container, newsCls.article)}>
      <h2 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlack,
        newsCls.title,
      )}
      >
        Новости
      </h2>
      <LinkWithArrow
        to="news"
        alt="Все новости"
        className={newsCls.linkWithArrow}
      >
        Все новости
      </LinkWithArrow>
    </article>
  );
}
