import React, {Component} from 'react';

export default class BiddingRules extends Component {
    render() {
        return (
            <div className='container indent'>
                <div>
                    <p className='detail-information features'>
                        <strong>Порядок работы</strong><br/>
                       <ul>
                           <li>Торги проводятся на сайте. На сайте размещается каталог домов с фотографиями,
                               описаниями, стартовыми ценами от реальных продавцов. С этого момента покупатель может
                               делать ставки.
                           </li>
                            <li>
                                Во время проведения аукциона потенциальные Покупатели могут ознакомиться с
                                интересующими их домами на сайте.
                            </li>
                       </ul>
                    </p>
                    <p className='detail-information features'>
                        <strong>Участие в торгах</strong><br/>
                        <ul>
                            <li>
                                Участниками торгов могут быть любые пользователи с SSO и эфириум аккаунтом
                            </li>
                            <li>
                                Чтобы начать торг за интересующий дом, надо перейти в детальное описание дома по
                                нажатию кнопки «Подробная информация», затем нажать кнопку «Подать заявку» и ввести сумму.
                            </li>
                            <li>
                                После окончания аукциона участникам-победителям автоматически рассылаются сообщения с
                                оповещением о выигранных лотах.
                            </li>
                        </ul>
                    </p>
                    <p className='detail-information features'>
                        <strong>Оплата</strong><br/>
                        <ul>
                            <li>
                                Оплата приобретенного дома принимается в эфирах (ETH)
                            </li>
                            <li>
                                Оплата счета производится моментально в момент завершения аукциона
                            </li>
                        </ul>
                    </p>
                    <p className='detail-information features'>
                        <strong>Гарантии и обязательства</strong><br/>
                        <ul>
                            <li>
                                На сайте для Покупателя размещается каталог с полным описанием и состоянием лотов,
                                поэтому претензии по качеству и состоянию предметов после проведения аукциона не принимаются.
                            </li>
                            <li>
                                Дальнейшая передача прав собственности проходит в офлайн -режиме. Для полной интеграции -
                                мгновенной передачи прав собственности, необходима поддержка блокчейна со стороны
                                государственных структур
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        )
    }
}

