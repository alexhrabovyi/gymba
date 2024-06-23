import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import contactsCls from './Contacts.module.scss';
import cityImg from './images/cityImg.webp';
import TimeIcon from './images/time.svg';

const Contacts: React.FC = () => (
  <main className={classNames(
    containerCls.container,
    contactsCls.main,
  )}
  >
    <h1 className={classNames(
      textCls.text,
      textCls.textFw800,
      textCls.text48px,
      textCls.textBlack,
      contactsCls.title,
    )}
    >
      Контакти
    </h1>
    <div className={contactsCls.addressCard}>
      <img
        className={contactsCls.img}
        src={cityImg}
        alt="Одеса"
      />
      <div className={contactsCls.addressCardTextBlocks}>
        <div className={contactsCls.addressCardTextBlock}>
          <p className={classNames(
            textCls.text,
            textCls.text16px,
            textCls.textGrey,
          )}
          >
            Телефон:
          </p>
          <a
            className={contactsCls.addressLink}
            href="tel:+380974311101"
          >
            +38 097 431-11-01
          </a>
        </div>
        <div className={contactsCls.addressCardTextBlock}>
          <p className={classNames(
            textCls.text,
            textCls.text16px,
            textCls.textGrey,
          )}
          >
            Адреса:
          </p>
          <p className={classNames(
            textCls.text,
            textCls.text21px,
            textCls.textBlack,
            contactsCls.addressCardText,
          )}
          >
            м. Одеса, вул. Рішельєвська, 21
          </p>
        </div>
      </div>
      <div className={contactsCls.openingHoursBlock}>
        <TimeIcon />
        <p className={classNames(
          textCls.text,
          textCls.text16px,
          textCls.textBlack,
        )}
        >
          Пн-пт: 8:00—17:00; Сб: 8:00—11:00
        </p>
      </div>
    </div>
    <div className={contactsCls.infoTableBlock}>
      <h2 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text36px,
        textCls.textBlack,
        contactsCls.subtitle,
      )}
      >
        Реквізити компанії
      </h2>
      <table className={contactsCls.infoTable}>
        <tbody className={contactsCls.tbody}>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              Найменування:
            </th>
            <td className={contactsCls.tableCell}>
              ТОВ &ldquo;Ґимба&ldquo;
            </td>
          </tr>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              ЄДРПОУ:
            </th>
            <td className={contactsCls.tableCell}>
              40367123
            </td>
          </tr>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              Юридична адреса:
            </th>
            <td className={contactsCls.tableCell}>
              65069, Одеська область, м. Одеса, вул. Рішельєвська, 21
            </td>
          </tr>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              IBAN
            </th>
            <td className={contactsCls.tableCell}>
              UANP3057564166410648351904781
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
);

export default Contacts;
