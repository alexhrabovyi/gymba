import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import contactsCls from './Contacts.module.scss';
import cityImg from './images/cityImg.png';
import TimeIcon from './images/time.svg';

export default function Contacts() {
  return (
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
        Контакты
      </h1>
      <div className={contactsCls.addressCard}>
        <img
          className={contactsCls.img}
          src={cityImg}
          alt="Казань"
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
              href="tel:+78432334422"
              alt="+7 843 233-44-22"
            >
              +7 843 233-44-22
            </a>
          </div>
          <div className={contactsCls.addressCardTextBlock}>
            <p className={classNames(
              textCls.text,
              textCls.text16px,
              textCls.textGrey,
            )}
            >
              Адрес:
            </p>
            <p className={classNames(
              textCls.text,
              textCls.text21px,
              textCls.textBlack,
              contactsCls.addressCardText,
            )}
            >
              г. Казань, ул. Техническая, 10/2
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
          Реквизиты компании
        </h2>
        <table className={contactsCls.infoTable}>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              Наименование:
            </th>
            <td className={contactsCls.tableCell}>
              ООО «ЭПК»
            </td>
          </tr>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              ИНН:
            </th>
            <td className={contactsCls.tableCell}>
              1639047491
            </td>
          </tr>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              КПП:
            </th>
            <td className={contactsCls.tableCell}>
              163901001
            </td>
          </tr>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              Юридический адрес:
            </th>
            <td className={contactsCls.tableCell}>
              423874, Республика Татарстан, Тукаевский р-он,
              с. Тлянче-тамак, ул. Школьная, д. 44
            </td>
          </tr>
          <tr className={contactsCls.tableRow}>
            <th
              className={contactsCls.rowHeader}
              scope="row"
            >
              ОГРН:
            </th>
            <td className={contactsCls.tableCell}>
              1121674004143
            </td>
          </tr>
        </table>
      </div>
    </main>
  );
}
