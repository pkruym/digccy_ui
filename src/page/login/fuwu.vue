<template>
  <model-full :title="title" class="model">
    <div class="main_page">
      <!-- <iframe
        scrolling="yes"
        id="main"
        name="main"
        frameborder="0"
        :src="path"
        style="width:100%;margin-bottom:60px"
        :style="{ height: oHeight + 'px' }"
      ></iframe> -->

     <template v-if="$route.query.xieyi==1">
             <div v-if="$lang == 'en'" class="single-content form-group ">
            <p style="text-align:center;line-height:0.6rem">《Platform Service Agreement》</p>
        <p>Welcome to this website (hereinafter referred to as "platform") service! To use the platform of the service,
            users should read and comply with this agreement, the user must carefully read and fully understand the
            terms of the content. Unless the user has read and accepted all the terms of this agreement, otherwise the
            user is not authorized to use the service platform. Users using the platform of services is deemed to have
            read and agreed to the above protocol constraints.
        </p>
        <p>If the user is under 18 years of age, please do not use this platform and related services. Because the user
            authorizes others to use the platform services, this platform will be regarded as the user's own operation,
            and the user is required to ensure that the actual operator obtains real authorization.
        </p>
        <h4>1.【The scope and form of the agreement】
        </h4>
        <p>In this agreement, the following words have the following meanings unless the context explains otherwise:
        </p>
        <p> 1.1 This agreement is an agreement between the user and the platform regarding the use of platform-related
            services by the user. "Platform" means the operator of the platform. "User" means a user who uses the
            platform-related services, and is more commonly referred to as "you" in this agreement.
        </p>
        <p> 1.2 The services under this agreement refer to products and services provided by the platform to you,
            including but not limited to Internet financial information, transaction items, e-commerce and advertising
            (hereinafter referred to as "the Service").
        </p>
        <p> 1.3 When you use a specific service of the platform, the service may have separate agreement terms, related
            business rules, etc. (hereinafter collectively referred to as "separate agreement"). Once the above content
            is formally released, it forms an integral part of this agreement, and you should also abide by it.
        </p>
        <p> 1.4 This agreement is formed in the form of a network sign. You check the "I have read and agree to
            the" Platform Service Agreement "" on the webpage and click the "Next" button to take effect. The validity
            period of the agreement is the same as the validity period of your platform account. After your platform
            account is cancelled or cancelled, the platform agreement will be terminated or cancelled, but the validity
            of terms such as confidentiality and intellectual property will not be affected.
        </p>
        <h4>2.[account and password security]
        </h4>
        <p> 2.1 You need to register an account when using the platform's services. Regarding the specific rules of your
            account, please abide by this agreement and other usage rules.
        </p>
        <p>2.2 The platform specially reminds you to keep your account and password properly. When you are done using
            it, you should exit safely. You may be responsible for hacking or password theft because of your poor
            storage.
        </p>
        <h4>3.[User Personal Information Protection]
        </h4>
        <p>3.1 Protecting user personal informa3.2 In the process of registering an account or using the service, you
            may need to fill in some necessary information. If there are special regulations in national laws and
            regulations, you need to fill in the real identity information. If the information you fill in is
            incomplete, you will not be able to use the service or be restricted during use.tion is a basic principle of
            the platform.
        </p>
        <p>3.2 In the process of registering an account or using the service, you may need to fill in some necessary
            information. If there are special regulations in national laws and regulations, you need to fill in the real
            identity information. If the information you fill in is incomplete, you will not be able to use the service
            or be restricted during use.
        </p>
        <p>3.3 Generally, you can browse and modify the information you submit at any time, but you may not be able to
            modify the initial registration information and other verification information provided during registration
            due to security and identification (such as number appeal service) considerations.
        </p>
        <p>3.4 The platform will use a variety of security technologies and procedures to establish a sound management
            system to protect your personal information from unauthorized access, use or disclosure.
        </p>
        <p>3.5 The platform will not transfer or disclose your personal information to any unaffiliated third party,
            unless:
        </p>
        <p>(1) Relevant laws and regulations or requirements of courts and government agencies;
        </p>
        <p>(2) The platform believes that it is necessary and appropriate to guarantee the legitimate rights and
            interests of the public, customers and employees of the platform;
        </p>
        <p>(3) Transfer as part of a merger, acquisition, asset transfer or similar transaction;
        </p>
        <p>(4) Necessary for the platform to provide the services you require.
        </p>
        <h4>4.[How to use the services of this platform]
        </h4>
        <p> 4.1 You shall use the services of this platform in a manner provided or approved by the platform. Your
            rights under this agreement are not transferable.
        </p>
        <p>4.2 You shall not use plug-ins, plug-ins or third-party tools that are not authorized by the platform to
            interfere with, destroy, modify or exert other influences on the services under this agreement.
        </p>
        <p>4.3 Part of the content of this platform service requires you to complete identity authentication and bank
            card authentication according to the requirements of this platform. If you do not perform identity
            authentication and / or bank card authentication, you will not be able to use this part of the platform
            services. The platform does not bear any responsibility for losses caused by failure to complete the
            certification and enjoy the services of the platform.
        </p>
        <h4> 5. [platform service content]
        </h4>
        <p>You understand and agree that the service of the platform is provided according to the current situation
            that the existing technology and conditions can achieve. The platform will try its best to provide
            services to you to ensure the consistency and security of services; however, the platform cannot foresee
            and prevent legal, technical and other risks at any time, including but not limited to service
            interruption, data loss and other losses that may be caused by force majeure, viruses, Trojans, hacker
            attacks, system instability, third-party service defects, government behavior and other reasons And
            risk. The platform will provide you with the following services, including but not limited to:
        </p>
        <p>5.1 information service
        </p>
        <p>(1) You agree that the platform can send all kinds of information to you by itself or by a third-party
            service provider through the platform web page, announcement, SMS and other ways in the process of
            providing services, and its method and scope can be changed without special notice to you.
        </p>
        <p>(2) The platform shall perform relevant obligations in accordance with the law, but you shall judge the
            contents of the announcement information and be responsible for your judgment. Except for the explicit
            provisions of the law, the platform shall not be liable for the loss or damage you suffer due to the
            transaction based on the announcement information (except for the responsibility attributable to the
            platform due to the untrue or misleading announcement information itself).
        </p>
        <p>(3) You agree that you should carefully judge the authenticity and reliability of all kinds of
            transaction information in the platform services, and you should be responsible for the transactions
            conducted according to the above information, except as expressly stipulated by law.
        </p>
        <p>5.2 customer service:
        </p>
        <p>(1) Bank card authentication: for the services of recharging, cashing and withholding provided by the
            platform or the third party entrusted by the platform, you should submit the effective bank debit card
            registered in your own name and other information in accordance with the process specified by the
            platform. After being approved by the platform, the platform will bind your account with the aforesaid
            bank account. If you fail to submit relevant information or the submitted information is wrong, false,
            outdated or incomplete in accordance with the provisions of the platform, or the platform has reasonable
            reasons to suspect that the information you submit is wrong, false, outdated or incomplete, the platform
            has the right to refuse to provide you with the bank card authentication service, and you shall bear the
            losses caused by your failure to use the services such as recharge, cash withdrawal and withholding.
        </p>
        <p>(2) Payment: you can use the method specified by this platform to charge funds into your unique platform
            account for transactions through this platform.
        </p>
        <p>(3) Payment on behalf: the platform provides payment services according to the functions open to you at
            that time, i.e. collecting the principal and interest income obtained after your transaction or all
            kinds of payments made by the third party to your account on its own or by entrusting the third party,
            or paying the payments in your account to other parties designated by you. The platform does not
            guarantee that the above-mentioned services provided meet your expectations.
        </p>
        <p>(4) Withdrawal: you can transfer the funds in your account to the bank card account that has been
            certified and bound through the withdrawal function open at that time on this platform. The platform
            will, as soon as possible after receiving your above instructions, remit the corresponding funds to your
            certified and bound bank card account through a third-party organization (there will be differences in
            the time of remittance according to the different banks you provide).
        </p>
        <p>(5) Query: the platform will record all your operations on the platform, regardless of whether the
            purpose of the operation is ultimately achieved. You can query the transaction records under the user
            account name in real time through the user account. You understand and agree that the service that you
            finally receive the payment is provided by the bank corresponding to your certified bank card, and you
            need to ask the bank for verification.
        </p>
        <p>(6) You understand that the above payment, payment on behalf and cash withdrawal services involve the
            cooperation of the platform with banks, third-party payment institutions and other third parties. You
            agree:
        </p>
        <p>A) limited by the status quo that banks, third-party payment institutions and other third parties only
            carry out fund withholding and transfer on working days, the platform does not make any commitment to
            the time of receipt of funds for the above-mentioned services, and does not assume any responsibility
            related to this, including but not limited to the loss of interest, currency depreciation and so on;
        </p>
        <p> b)
            Once you use the above-mentioned services, you irrevocably authorize the platform to carry out relevant
            operations, which are irreversible, and you cannot refuse to pay or request to cancel the transaction
            for any reason. For the above services, the platform will not charge you for the time being, but you
            should pay the fees to the third party according to the regulations of the third party. Please refer to
            the relevant instructions of the platform for details. Any dispute or dispute between the third party
            and the third party in respect of payment matters is irrelevant to the platform.
        </p>
        <p>5.3 trading services:
        </p>
        <p>(1) You promise to register and use only one account in this platform.
        </p>
        <p>
            (2) You confirm that your account will become an irrevocable instruction for the platform to carry out
            relevant transactions or operations (including but not limited to payment or collection, freezing of
            funds, conclusion of contracts, etc.) for you according to the instructions and confirmed transaction
            status issued by the platform according to the service description of the platform. You agree that the
            execution time of relevant instructions shall be subject to the actual operation time of the platform in
            the platform system. You agree that the platform has the right to handle relevant matters in accordance
            with this Agreement and / or relevant dispute handling rules of the platform. You shall be responsible
            for any dispute or loss caused by your failure to modify, confirm or submit relevant application in
            time, and the platform shall not bear any responsibility.
        </p>
        <p> (3)
            You understand and agree that the platform shall not bear any responsibility for the transaction
            conducted on the platform, and the platform cannot and shall not be obliged to guarantee that you can
            obtain the expected income after the transaction offer or investment intention is issued, the actual
            transaction is successful or the transaction is successful. The loss (including but not limited to
            interest, handling fee and other losses) caused by the above reasons shall be borne by you Undertake,
            this platform does not undertake responsibility.
        </p>
        <p>(4) If you fail to comply with the terms of this agreement or the operation instructions in the
            transaction rules published by the platform when you conduct transactions or accept transaction payments
            through the platform, the platform will not assume any responsibility. In case of any of the above
            situations and the payment has been transferred to your account in advance, you agree that the platform
            has the right to directly deduct the payment from the relevant account and prohibit your right to claim
            the payment. If the money has been remitted to your bank account, you agree that the platform has the
            right to recover it from you afterwards, and the resulting recovery costs shall be borne by you.
        </p>
        <p>(5) The platform has the right to set relevant matters related to the transaction from time to time based
            on the consideration of transaction security, including but not limited to transaction limit,
            transaction times, counterparties, etc. you understand that the above setting of the platform may cause
            certain inconvenience to the transaction, and there is no objection to this.
        </p>
        <p>(6) If there is a processing error due to system failure or any other reason on the platform, the
            platform has the right to correct the error whether it is beneficial to the platform or to you. If the
            error results in that you actually receive more money than you should receive, the platform reserves the
            right to correct the improperly executed transaction regardless of the nature and reason of the error,
            and you shall return the overpaid money or carry out other operations according to the specific
            requirements of the notice of correction of the error sent by the platform to you. You understand and
            agree that any overpayment or underpayment due to the above-mentioned processing errors will not be
            subject to interest, and this platform will not bear any loss or liability (including the loss of
            interest, exchange rate, etc. due to the above-mentioned errors) caused by the above-mentioned
            processing errors.
        </p>
        <h4> 6. [self provided equipment]
        </h4>
        <p>6.1 you should understand that you need to prepare terminal equipment (such as computers, modems and
            other devices) related to relevant services by yourself when using the service of the platform, and
            bear the required expenses (such as telephone fee, Internet fee, etc.).
        </p>
        <p>6.2 you understand and agree that you will consume your terminal equipment, bandwidth and other
            resources when using this service.
        </p>
        <h4> 7. [agreement deposit and evidence]
        </h4>
        <p>7.1 the platform provides you with the services of saving, viewing and checking the electronic
            agreement. If you have any questions about the authenticity of the electronic agreement or the
            content of the electronic agreement, you can check it by using the "check contract" function of
            the platform. In case of any dispute, the platform records shall prevail.
        </p>
        <p>7.2 you are not allowed to copy or forge the electronic agreement or seal signed on the platform
            without permission, nor to use the forged contract to cheat or other illegal use, otherwise, the
            platform reserves all rights to investigate your legal liability.
        </p>
        <p>7.3 you understand and agree that all information related to the services of the platform,
            including transaction amount, transaction details and profit and loss, shall be subject to the
            query results of the platform, and relevant evidence shall be subject to the records of such
            information on the platform. If the query results of relevant pages are inconsistent with the
            written records provided by the platform, the written records shall prevail.
        </p>
        <h4> Age. [charging service]
        </h4>
        <p>8.1 part of the services of the platform are provided by charging (including the fees to be
            paid to the bank or payment institution in the process of payment). If you use the charging
            service, please follow the relevant agreement or instructions.
        </p>
        <p>
            8.2 the platform may modify and change the charging standard and method of the charging
            service according to the actual needs (or the requirements of the third party), and the
            platform may also start charging for some free services. Before the aforesaid modification,
            change or charging, the platform will notify or announce on the corresponding service page.
            If you do not agree to the above changes, changes or paid content, you should stop using the
            service.
        </p>
        <h4> 9. [products or services provided by a third party]
        </h4>
        <p>When you use the products or services provided by a third party on the platform, you shall abide by the
            business rules and user agreements of the third party in addition to the agreement. The platform and the
            third party shall be responsible for the possible disputes within the scope of laws and agreements.
        </p>
        <h4> 10. [user's illegal act]
        </h4>
        <p>10.1 you must abide by laws and regulations when using the platform, and shall not use the platform to engage
            in illegal activities, including but not limited to:
        </p>
        <p>(1) Infringe upon the reputation, privacy, trade secrets, trademark rights, copyright, patent rights, other
            intellectual property rights and other rights and interests of others.
        </p>
        <p>(2) Breach of confidentiality obligations under laws or contracts.
        </p>
        <p>(3) Engage in any illegal transaction, such as trafficking in guns, drugs, banned drugs, pirated software or
            other contraband.
        </p>
        <p>(4) Provide gambling information or in any way induce others to participate in gambling.
        </p>
        <p>(5) Suspected of money laundering, cash arbitrage or pyramid selling activities.
        </p>
        <p>(6) Engage in any behavior that may contain computer virus or may infringe the service system and data of the
            platform.
        </p>
        <p>(7) Use the service system of the platform to conduct behaviors that may cause adverse effects on the normal
            operation of the Internet or mobile network.
        </p>
        <p>(8) Use this platform service to upload, display or disseminate false, harassing, slandering, abusive,
            intimidating, vulgar, obscene or any other illegal information.
        </p>
        <p>(9) Other acts deemed inappropriate by the platform with justifiable reasons.
        </p>
        <p>10.2 if you violate the provisions of this article, the relevant national authorities or institutions may
            file a lawsuit, fine or take other sanctions against you, and ask the platform for assistance. In case of
            damage, you shall compensate according to law, and the platform shall not bear any responsibility.
        </p>
        <p>10.3 if the platform finds or receives reports from others that the information you published violates the
            provisions of this article, the platform has the right to make independent judgment and take technical
            measures to delete, block or disconnect the link. At the same time, the platform has the right to take
            measures, including but not limited to suspension or termination of services, restriction, freezing or
            termination of use, and investigation of legal liabilities, depending on the nature of users' behaviors.
        </p>
        <p>10.4 if you violate the provisions of this article and cause any third party damage, you shall bear the
            responsibility independently; if the platform suffers losses as a result, you shall also make compensation
            together.
        </p>
        <h4>11. Intellectual property declaration</h4>
        <p>The intellectual property rights of the content (including but not limited to web page, text, picture, audio,
            video, chart, etc.) provided by the platform in the service are protected by law. Without the written
            permission of the platform or relevant obligee, no one is allowed to use or create relevant derivative works
            in any form.
        </p>
        <h4> 12. [force majeure and other exemptions] </h4>
        <p>
            12.1 you understand and agree that during the use of the service, you may encounter force majeure and other
            risk factors, which may cause interruption of the service. Force majeure refers to unforeseeable,
            insurmountable and unavoidable objective events that have a significant impact on one or both parties,
            including but not limited to natural disasters such as floods, earthquakes, epidemics and storms, as well as
            social events such as wars, riots, government actions, etc. In case of the above situation, the platform
            will try to cooperate with relevant units in the first time and repair in time, but the platform will be
            exempted from liability to the extent permitted by law for the loss caused to you.
        </p>
        <p>(1) Damaged by computer viruses, Trojans or other malicious programs or hackers;
        </p>
        <p>(2) The computer software, system, hardware and communication line of the user or platform are in failure;
        </p>
        <p>(3) Improper operation of users;
        </p>
        <p>12.2 to the extent permitted by law, the platform shall not be liable for service interruption or obstruction
            caused by:
        </p>
        <p>(1) Users use the service through non platform authorization;
        </p>
        <p>(2) Circumstances beyond the control or reasonably foreseen by other platforms.
        </p>
        <p>12.3 the platform obtains the right to deal with the illegal content according to the agreement, which does
            not constitute the obligation or commitment of the platform, and the platform cannot guarantee to discover
            the illegal behavior in time or deal with it accordingly.
        </p>
        <p>12.4 under no circumstances should you credibly borrow money, ask for passwords or other network information
            involving property. In case of property operation, please verify the identity of the other party first, and
            pay attention to the platform's tips on preventing fraud.
        </p>
        <p>12.5 the platform is not a bank or financial institution. According to Chinese laws and regulations, the
            platform does not provide "instant" amount transfer service, and in any case, the platform does not assume
            any responsibility for the delay of fund receipt.
        </p>
        <h4> 13. [restriction and change of agreement]
        </h4>
        <p>13.1 by using the services of the platform, you shall be deemed to have read this Agreement and be bound by
            it.
        </p>
        <p>13.2 the platform has the right to modify this agreement if necessary. You can check the latest version of
            the agreement on the relevant services page.
        </p>
        <p>13.3 after the change of this agreement, if you continue to use the services provided by the platform, you
            will be deemed to have accepted the modified agreement. If you do not accept the modified agreement, you
            should stop using the services provided by the platform.
        </p>
        <h4> 14. [change, interruption and termination of service]
        </h4>
        <p>14.1 the platform may change the service content, or interrupt, suspend or terminate the service.
        </p>
        <p>14.2 in case of any of the following situations, the platform has the right to interrupt or terminate the
            services provided to you without notice:
        </p>
        <p>(1) According to the law, you should submit true information, and the personal data you provide is not true,
            or inconsistent with the information at the time of registration and fails to provide reasonable proof;
        </p>
        <p>(2) You violate the relevant laws and regulations or the agreement;
        </p>
        <p>(3) In accordance with the law or the requirements of the competent authorities;
        </p>
        <p>(4) For safety reasons or other necessary circumstances.
        </p>
        <p>14.3 the platform has the right to charge according to Article 8.2 of this agreement. If you fail to pay in
            full and on time, the platform has the right to suspend, suspend or terminate the service.
        </p>
        <p>14.4 you are responsible for backing up the data stored in the platform by yourself. If your service is
            terminated, the platform can permanently delete your data from the server. After the service is terminated,
            the platform has no obligation to return data to you.
        </p>
        <h4> 15.[jurisdiction and application of Law]
        </h4>
        <p>15.1 the laws of the people's Republic of China shall apply to the establishment, effectiveness, performance,
            interpretation and dispute resolution of this agreement.
        </p>
        <p>15.2 in case of any dispute or dispute between you and the platform, it shall be settled through friendly
            negotiation first; if the negotiation fails, you agree to submit the dispute or dispute to the people's
            court with jurisdiction in the place where this agreement is signed for jurisdiction.
        </p>
        <p>15.3 the title of all terms of this agreement is only for convenience of reading, and has no actual meaning,
            and cannot be used as the basis for interpretation of the meaning of this agreement.
        </p>
        <p>15.4 the terms of this Agreement shall be invalid or unenforceable in part for any reason, and the remaining
            terms shall remain valid and binding on both parties.
        </p>
        <h4> 16. [privacy and confidentiality terms]
        </h4>
        <p>16.1 the platform will only collect personal data that the platform considers relevant and helps to
            understand your financial needs, so as to facilitate the business operation of the platform.
        </p>
        <p>16.2 the platform may transfer your personal data to the member institutions or affiliated entities of the
            platform, but within the scope permitted by law.
        </p>
        <p>16.3 the platform may provide your relevant information to the partner jointly providing business with the
            platform, but the partner still needs to keep your relevant information confidential.
        </p>
        <p>16.4 if required by law, such as the requirements of judicial authorities, regulatory agencies and other
            relevant institutions, the platform will provide your relevant information in accordance with the
            instructions.
        </p>
        <p>16.5 the platform collects your relevant information in order to provide you with better products and
            services. The platform will use the collected information to ensure your capital security, understand your
            financial needs and carry out various businesses.
        </p>
        <p>16.6 the platform is equipped with a strict security system, and any person or organization without
            permission is not allowed to obtain your relevant information, so as to prevent anyone (including employees
            of the platform) from obtaining your personal data without authorization.
        </p>
        <p>16.7 the platform will strive to ensure the completeness and accuracy of your relevant information, and
            provide convenience for you to change information.
        </p>
        <p>16.8 when you register on the website of this platform, you agree that this platform and its partners will
            send email or SMS (including advertising information related to this platform) related to financial services
            of this platform to the email and mobile phone filled in when you register.
        </p>
        <p>Special note: every time you use the service of this platform, you should directly log in to this platform or
            use the link provided by this platform to log in to this platform, rather than through the email sent by a
            third party or the link provided by other platforms. Every time you call the customer service number of this
            platform, you should call the customer service number provided by the official platform of this platform
            instead of any other phone call.
        </p>
         </div>
          <div v-if="$lang != 'en'" class="single-content form-group ">
        <p style="text-align:center;line-height:0.6rem" class="title">《平台服务协议》</p>
        <p>
        欢迎使用本网站（以下简称"平台"）的服务！为使用平台的服务，用户应当阅读并遵守本协议,请用户务必审慎阅读、充分理解各条款内容。除非用户已阅读并接受本协议所有条款，否则用户无权使用平台提供的服务。用户使用平台的服务即视为已阅读并同意上述协议的约束。
        如果用户未满18周岁，请勿使用本平台及相关服务，由于用户授权其他人使用本平台服务，本平台将视为用户本人自己的操作，请用户确保实际操作者获得真实授权。</p>
        <p class="title">一、【协议的范围及形式】
            <p>
                <p>本协议中，除非上下文另有解释，下列词语具有如下含义：
                    <p>
                        <p>1.1本协议是用户与平台之间关于用户使用平台相关服务所订立的协议。"平台"是指平台的运营服务商。"用户"是指使用平台相关服务的使用人，在本协议中更多地称为"您"。</p>
                        <p>1.2本协议项下的服务是指平台向您提供的包括但不限于互联网金融信息、交易项目、电子商务和广告等产品及服务（以下简称"本服务"）。</p>
                        <p>1.3您在使用平台某一特定服务时，该服务可能会另有单独的协议条款、相关业务规则等（以下统称为"单独协议"）。上述内容一经正式发布，即与本协议构成不可分割的共同组成部分，您同样应当遵守。
                        </p>
                        <p>1.4
                            本协议以网络签订形式形成，由您勾选网页上的"我已阅读并同意《平台服务协议》"并点击"下一步"按钮后生效。协议有效期与您的平台账户有效期一致，您的平台账户注销、被撤销后，平台协议随之终止或解除，但其中有关保密及知识产权等条款效力不受影响。
                        </p>
                        <p class="title">二、【账号与密码安全】</p>
                        <p>2.1您在使用平台的服务时需要注册一个账号。关于您使用账号的具体规则，请遵守本协议及其他使用细则。</p>
                        <p>2.2平台特别提醒您应妥善保管您的账号和密码。当您使用完毕后，应安全退出。因您保管不善可能导致遭受盗号或密码失窃，责任由您自行承担。</p>
                        <p class="title">三、【用户个人信息保护】</p>
                        <p>3.1保护用户个人信息是平台的一项基本原则。</p>
                        <p>3.2您在注册账号或使用本服务的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整，则无法使用本服务或在使用过程中受到限制。
                        </p>
                        <p>3.3一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。</p>
                        <p>3.4平台将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
                        <p>3.5平台不会将您的个人信息转移或披露给任何非关联的第三方，除非：</p>
                        <p>（1）相关法律法规或法院、政府机关要求；</p>
                        <p>（2）平台认为，为保证社会公众、平台的客户及员工的合法权益所必要且适当；</p>
                        <p>（3）作为合并、收购、资产转让或类似交易的一部分而转移；</p>
                        <p>（4）为平台提供您要求的服务所必需。</p>
                        <p class="title">四、【使用本平台服务的方式】</p>
                        <p>4.1您应当通过平台提供或认可的方式使用本平台服务。您依本协议条款所取得的权利不可转让。</p>
                        <p>4.2您不得使用未经平台授权的插件、外挂或第三方工具对本协议项下的服务进行干扰、破坏、修改或施加其他影响。</p>
                        <p>4.3
                            本平台服务的部分内容需要您根据本平台要求完成身份认证及银行卡认证，未进行身份认证及/或银行卡认证的您将无法使用该部分本平台服务。因未能完成认证而无法享受本平台服务造成的损失，本平台不承担任何责任。
                        </p>
                        <p class="title">五、【平台服务提供内容】</p>
                        <p>您理解并同意，平台的服务是按照现有技术和条件所能达到的现状提供的。平台会尽最大努力向您提供服务，确保服务的连贯性和安全性；但平台不能随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力、病毒、木马、黑客攻击、系统不稳定、第三方服务瑕疵、政府行为等原因可能导致的服务中断、数据丢失以及其他的损失和风险。平台将向您提供包括但不限于以下服务：
                        </p>
                        <p>5.1信息服务</p>
                        <p>（1）您同意平台可以在提供服务的过程中自行或由第三方服务商通过平台网页、公告、短信等方式向您发送各类信息，其方式和范围可不经向您特别通知而变更。</p>
                        <p>（2）平台依照法律的规定履行相关义务，但您应当自行判断公告信息的内容并为自己的判断行为负责，除法律明确规定外，您因依公告信息进行的交易而遭受的损失或损害，平台不承担责任（因公告信息本身不实、误导等归属平台责任的除外）。
                        </p>
                        <p>（3）您同意，对平台服务中出现的各类交易信息，您应自行审慎判断其真实性和可靠性，除法律明确规定外，您应对依上述信息进行的交易负责。</p>
                        <p>5.2客户服务：</p>
                        <p>（1）银行卡认证：为使用本平台或本平台委托的第三方机构提供的充值、取现、代扣等服务，您应按照本平台规定的流程提交以您本人名义登记的有效银行借记卡等信息，经由本平台审核通过后，本平台会将您的账户与前述银行账户进行绑定。如您未按照本平台规定提交相关信息或提交的信息错误、虚假、过时或不完整，或者本平台有合理的理由怀疑您提交的信息为错误、虚假、过时或不完整，本平台有权拒绝为您提供银行卡认证服务，您因此未能使用充值、取现、代扣等服务而产生的损失自行承担。
                        </p>
                        <p>（2）支付：您可以使用本平台指定的方式向您的唯一平台账户充入资金，用于通过本平台交易。</p>
                        <p>（3）代付：本平台按照其平台当时向您开放的功能提供代付服务，即自行或委托第三方机构代为收取您交易后获得的本息收入或第三方向您的账户支付的各类款项，或者，将您账户里的款项支付给您指定的其他方。本平台不保证提供的前述服务符合您的期望。
                        </p>
                        <p>（4）提现：您可以通过本平台当时开放的取现功能将您账户中的资金转入经过认证并绑定的银行卡账户中。本平台将于收到您的前述指示后，尽快通过第三方机构将相应的款项汇入您经过认证并绑定的银行卡账户（根据您提供的银行不同，会产生汇入时间上的差异）。
                        </p>
                        <p>（5）查询：本平台将对您在本平台的所有操作进行记录，不论该操作之目的最终是否实现。您可以通过用户账户实时查询用户账户名下的交易记录。您理解并同意您最终收到款项的服务是由您经过认证的银行卡对应的银行提供的，需向该银行请求查证。
                        </p>
                        <p>（6）您了解，上述支付、代付及提现服务涉及本平台与银行、第三方支付机构等第三方的合作。您同意：</p>
                        <p>a）
                            受银行、第三方支付机构等第三方仅在工作日进行资金代扣及划转的现状等各种原因所限，本平台不对前述服务的资金到账时间做任何承诺，也不承担与此相关的责任，包括但不限于由此产生的利息、货币贬值等损失；
                        </p>
                        <p>b）
                            一经您使用前述服务，即表示您不可撤销地授权本平台进行相关操作，且该等操作是不可逆转的，您不能以任何理由拒绝付款或要求取消交易。就前述服务，本平台暂不会向您收取费用，但您应按照第三方的规定向第三方支付费用，具体请见平台相关说明信息。与第三方之间就费用支付事项产生的争议或纠纷，与本平台无关。
                        </p>
                        <p>5.3交易服务：</p>
                        <p>（1）您承诺在本平台只注册并使用唯一账户。</p>
                        <p>（2）您确认，您的账户根据在本平台上按本平台服务说明所发出的指令及所确认的交易状态，将成为本平台为您进行相关交易或操作（包括但不限于支付或收取款项、冻结资金、订立合同等）的不可撤销的指令。您同意相关指令的执行时间以本平台在本平台系统中进行实际操作的时间为准。您同意本平台有权依据本协议及/或本平台相关纠纷处理规则等约定对相关事项进行处理。您未能及时对交易状态进行修改、确认或未能提交相关申请所引起的任何纠纷或损失由您自行负责，本平台不承担任何责任。
                        </p>
                        <p>（3）
                            您理解并同意，本平台对在本平台上进行的交易行为不承担任何责任，本平台无法也没有义务保证您在发出交易要约或投资意向后，能够实际交易成功或者交易成功后确定可以获得预期收益，您因前述原因导致的损失（包括但不限于利息、手续费等损失）由您自行承担，本平台不承担责任。
                        </p>
                        <p>（4）您通过本平台进行各项交易或接受交易款项时，若您未遵从本协议条款或本平台公布的交易规则中的操作指示，本平台不承担任何责任。若发生上述状况而款项已先行拨入您账户下，您同意本平台有权直接从相关您账户中扣回款项及禁止您要求支付此笔款项之权利。此款项若已汇入您的银行账户，您同意本平台有向您事后索回的权利，由此产生的追索费用由您承担。
                        </p>
                        <p>（5）本平台有权基于交易安全等方面的考虑不时设定涉及交易的相关事项，包括但不限于交易限额、交易次数、交易对手等，您了解本平台的前述设定可能会对交易造成一定不便，对此没有异议。</p>
                        <p>（6）如果本平台发生因系统故障或其他任何原因导致的处理错误，无论有利于本平台还是有利于您，本平台都有权纠正该错误。如果该错误导致您实际收到的款项多于应获得的金额，则无论错误的性质和原因为何，本平台保留纠正不当执行的交易的权利，您应根据本平台向您发出的有关纠正错误的通知的具体要求返还多收的款项或进行其他操作。您理解并同意，您因前述处理错误而多付或少付的款项均不计利息，本平台不承担因前述处理错误而导致的任何损失或责任（包括您可能因前述错误导致的利息、汇率等损失）。
                        </p>
                        <p class="title">六、【自备设备】</p>
                        <p>6.1您应当理解，您使用平台的服务需自行准备与相关服务有关的终端设备（如电脑、调制解调器等装置），并承担所需的费用（如电话费、上网费等费用）。</p>
                        <p>6.2您理解并同意，您使用本服务时会耗用您的终端设备和带宽等资源。</p>
                        <p class="title">七、【协议存管及证据】</p>
                        <p>7.1本平台向您提供电子协议的保存、查看、核对服务，如对电子协议真伪或电子协议的内容有任何疑问，您可通过使用本平台的"查阅合同"功能进行核对。如对此有任何争议，应以本平台记录为准。
                        </p>
                        <p>7.2您不得私自仿制、伪造在本平台上签订的电子协议或印章，不得用伪造的合同进行招摇撞骗或进行其他非法使用，否则本平台保留一切追究您法律责任的权利。</p>
                        <p>7.3您理解并同意通过与本平台服务有关的一切信息包括交易数额、交易详情及损益等均以本平台查询结果为准，相关证据均以该等信息在本平台的记录为准，有关页面查询结果一旦与本平台提供的书面记录不一致的，以书面记录为准。
                        </p>
                        <p class="title">八、【收费服务】</p>
                        <p>8.1平台的部分服务是以收费方式提供的（包括支付过程中需要向银行或支付机构支付的费用），如您使用收费服务，请遵守相关的协议或说明。</p>
                        <p>8.2平台可能根据实际需要（或第三方机构的要求）对收费服务的收费标准、方式进行修改和变更，平台也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，平台将在相应服务页面进行通知或公告。如果您不同意上述修改、变更或付费内容，则应停止使用该服务。
                        </p>
                        <p class="title">九、【第三方提供的产品或服务】</p>
                        您在平台上使用第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的业务规则、用户协议。平台和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。
                    </p>
                    <p class="title">十、【用户违法行为】</p>
                    <p>10.1您在使用本平台时须遵守法律法规，不得利用本平台从事违法违规行为，包括但不限于：</p>
                    <p>（1）侵害他人名誉、隐私权、商业秘密、商标权、著作权、专利权、其他知识产权及其他权益。</p>
                    <p>（2）违反依法律或合约所应负之保密义务。</p>
                    <p>（3）从事任何不法交易行为，如贩卖枪支、毒品、禁药、盗版软件或其他违禁物。</p>
                    <p>（4）提供赌博资讯或以任何方式引诱他人参与赌博。</p>
                    <p>（5）涉嫌洗钱、套现或进行传销活动的。</p>
                    <p>（6）从事任何可能含有电脑病毒或是可能侵害本平台服务系統、资料等行为。</p>
                    <p>（7）利用本平台服务系统进行可能对互联网或移动网正常运转造成不利影响之行为。</p>
                    <p>（8）利用本平台服务上传、展示或传播虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料。</p>
                    <p>（9）其他本平台有正当理由认为不适当之行为。</p>
                    <p>10.2如果您违反了本条约定，相关国家机关或机构可能会对您提起诉讼、罚款或采取其他制裁措施，并要求平台协助。造成损害的，您应依法予以赔偿，平台不承担任何责任。</p>
                    <p>10.3如果平台发现或收到他人举报您发布的信息违反本条约定，平台有权进行独立判断并采取技术手段予以删除、屏蔽或断开链接。同时，平台有权视用户的行为性质，采取包括但不限于暂停或终止服务，限制、冻结或终止使用，追究法律责任等措施。
                    </p>
                    <p>10.4您违反本条约定，导致任何第三方损害的，您应当独立承担责任；平台因此遭受损失的，您也应当一并赔偿。</p>
                    <p class="title">十一、【知识产权声明】</p>
                    <p>本平台在服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权均受到法律保护，未经平台或相关权利人书面许可，任何人不得以任何形式进行使用或创造相关衍生作品。</p>
                    <p class="title">十二、【不可抗力及其他免责事由】</p>
                    <p>12.1您理解并同意，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，平台将努力在第一时间与相关单位配合，及时进行修复，但是由此给您造成的损失平台在法律允许的范围内免责。
                    </p>
                    <p>（1）受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏；</p>
                    <p>（2）用户或平台的电脑软件、系统、硬件和通信线路出现故障；</p>
                    <p>（3）用户操作不当；</p>
                    <p>12.2在法律允许的范围内，平台对以下情形导致的服务中断或受阻不承担责任：</p>
                    <p>（1）用户通过非平台授权的方式使用本服务；</p>
                    <p>（2）其他平台无法控制或合理预见的情形。</p>
                    <p>12.3平台依据本协议约定获得处理违法违规内容的权利，该权利不构成平台的义务或承诺，平台不能保证及时发现违法行为或进行相应处理。</p>
                    <p>12.4在任何情况下，您不应轻信借款、索要密码或其他涉及财产的网络信息。涉及财产操作的，请一定先核实对方身份，并请经常留意平台有关防范诈骗犯罪的提示。</p>
                    <p>12.5 本平台并不是银行或金融机构，按照中国法律规定，本平台不提供"即时"金额转账服务，在任何情况下本平台对资金到账延迟不承担任何责任。</p>
                    <p class="title">十三、【协议的约束与变更】</p>
                    <p>13.1您使用平台的服务即视为您已阅读本协议并接受本协议的约束。</p>
                    <p>13.2平台有权在必要时修改本协议。您可以在相关服务页面查阅最新版本的协议。</p>
                    <p>13.3本协议变更后，如果您继续使用平台提供的服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用平台提供的服务。</p>
                    <p class="title">十四、【服务的变更、中断、终止】</p>
                    <p>14.1平台可能会对服务内容进行变更，也可能会中断、中止或终止服务。</p>
                    <p>14.2如发生下列任何一种情形，平台有权不经通知而中断或终止向您提供的服务：</p>
                    <p>（1）根据法律规定您应提交真实信息，而您提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；</p>
                    <p>（2）您违反相关法律法规或本协议的约定；</p>
                    <p>（3）按照法律规定或主管部门的要求；</p>
                    <p>（4）出于安全的原因或其他必要的情形。</p>
                    <p>14.3平台有权按本协议8.2条的约定进行收费。若您未按时足额付费，平台有权中断、中止或终止提供服务。</p>
                    <p>14.4您有责任自行备份存储在本平台中的数据。如果您的服务被终止，平台可以从服务器上永久地删除您的数据。服务终止后，平台没有义务向您返还数据。</p>
                    <p class="title">十五、【管辖与法律适用】</p>
                    <p>15.1本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国法律。</p>
                    <p>15.2若您和平台之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。</p>
                    <p>15.3本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
                    <p>15.4本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
                    <p class="title">十六、【隐私保密条款】</p>
                    <p>16.1 本平台只会收集本平台认为相关且有助于了解您理财需要的个人资料，以利于本平台的业务运营。</p>
                    <p>16.2 本平台可能将您的个人资料转交本平台的成员机构或关联实体，但会在法律许可的范围内进行。</p>
                    <p>16.3本平台可能会把您的相关信息提供给与本平台联合提供业务的合作伙伴，但该合作伙伴仍需对您的相关信息进行保密。</p>
                    <p>16.4在法律规定的情况下，如司法机关、监管机构及其他相关机构提出要求，本平台将依指令提供您的相关信息。</p>
                    <p>16.5本平台收集您的相关信息，目的在于为您提供更优质的产品和服务。本平台将把收集到的相关信息用于保证您的资金安全、了解您的金融需求以及各项业务的开展。</p>
                    <p>16.6本平台设有严格的安全系统，未经允许的任何个人或组织不得获取您的相关信息，以防止任何人（包括本平台员工）未经授权而取得您的个人资料。</p>
                    <p>16.7本平台将努力保证您相关信息的完整和准确，并为您变更信息提供便利。</p>
                    <p>16.8您在本平台网站注册，即视为您同意本平台及本平台的合作伙伴向您注册时填写的电子邮箱、移动电话等发送与本平台金融服务有关的电子邮件或短信（包含与本平台有关的广告信息等）。
                        特别提示：您每次使用本平台服务应直接登录本平台或使用本平台提供的链接登陆本平台，而不要通过第三方所发送的邮件或其他平台提供的链接登录。您每次拨打本平台客服电话应拨打本平台官方平台提供的客服电话，而不要拨打其他任何电话。
                    </p>
    </div>
      </template>
        <template v-else>
             <div class="single-content form-group ">
        <h3 style="text-align:center;line-height:0.6rem;margin-bottom: 10px;">《反洗钱和反恐怖协议》</h3>
        <p class="title">第一条    制定的目的和依据 鉴于洗钱活动将严重危害数字资产交易的发展，助长和滋生腐败、败坏社会风气，损害用户的正当权益，破坏数字资产交易平台稳健经营的基础，加大数字资产交易平台的法律和运营风险，火币极速版为预防洗钱和恐怖融资活动，全面履行反洗钱和反恐融资法律的相关规定，根据《火币极速版用户协议》、《火币极速版APP用户协议》等公司规定，制定本指引。</p>
        <p class="title">第二条    适用范围 本指引适用于在h5.ihuobi.cc和火币极速版数字资产交易所APP（以下简称“平台”）交易的所有用户。用户应当在遵循其所在地国家或地区反洗钱和反恐融资方面的法律规定，在用户所在地区法律规定的范围内，执行本指引之规定。用户所在国家或者地区有更严格要求的，遵守其规定。</p>
        
        

        <p class="title">第三条    反洗钱和反恐怖融资 是指为了防范不发分子通过平台进行交易从而掩饰、隐瞒毒品犯罪、黑社会性质的组织犯罪、恐怖活动犯罪、走私犯罪、贪污贿赂犯罪、金融诈骗犯罪、破坏金融管理秩序犯罪等违法所得及其收益的来源和性质的洗钱活动，依照相关法律和平台反洗钱相关规定采取相关措施的行为。</p>
    
        <p class="title">第四条    平台反洗钱相关规定火币极速版的反洗钱（包括反恐怖融资，下同）相关规则包括本指引、《火币极速版用户协议》和《火币极速版APP用户协议》中反洗钱的部分。若本指引中规定的内容与《火币极速版用户协议》或《火币极速版APP用户协议》中反洗钱的部分相冲突，则本指引优先适用。</p>
        <p class="title">第五条    平台反洗钱基本原则 平台按照以下原则开展用户风险监控工作：</p>
        <p>(一)     全面性原则。平台会综合考虑用户可能涉嫌洗钱的各类风险因素，采取合理方式对所有用户进行风险监控。</p>
        <p>(二)     审慎性原则。平台会在充分了解用户的基础上，提高对用户身份的识别能力，审慎进行用户风险监控。</p>
        <p>(三)     持续性原则。平台会对用户风险进行持续关注，根据实际情况适做出应对。</p>
        <p>(四)     保密性原则。平台所掌握的用户身份信息、交易信息和风险等级信息等予以严格保密，非依法律规定和监管要求，不会向任何单位和个人提供。</p>
        <p>(五)     分级管理原则。平台根据用户的风险等级，定期审核所保存的用户基本信息，对风险等级较高用户的审核应当严于对风险等级较低用户的审核。</p>

        
        <p class="title">第六条    责任机构 平台通过由风控部门和合规部门的人员组成反洗钱工作领导小组和反洗钱工作推进小组来进行平台反洗钱工作。</p>
        <p class="title">第七条    机构职能 反洗钱领导小组负责统筹、指导、协调平台的反洗钱工作，具体工作职责包括：</p>
        <p>(一)     审议批准平台反洗钱政策、工作计划和工作报告； </p>
        <p>(二)     颁布和更新平台的反洗钱指导原则和规则；</p>
        <p>(三)     审议平台和各分站的反洗钱组织架构和岗位设置；</p>
        <p>(四)     设计并完成内部检测和控制交易的程序；</p>
        <p>(五)     研究反洗钱工作的重大和疑难问题并形成解决方案。</p>
        <p>反洗钱推进小组成员构成情况结合监管要求和各地实际情况决定，其主要职责包括：</p>
        <p>(一)     贯彻反洗钱相关规则和反洗钱领导小组的工作部署；</p>
        <p>(二)     落实各项工作安排；</p>
        <p>(三)     对可疑交易的用户身份背景和业务交易进行分析认定；</p>
        <p>(四)     对用户的风险等级进行评定和调整；</p>
        <p>(五)     对用户进行尽职调查和持续监督；</p>
        <p>(六)     审查和定期检查已发生的交易；</p>
        <p>(七)     向主管当局报告可疑交易；</p>
        <p>(八)     应主管当局的要求协助调查。</p>

        

        <p class="title">第八条    尽职调查 遵循勤勉尽责、了解你的用户的原则，平台对所有用户首先进行尽职调查。对高风险的用户，平台有权进行更细致的尽职调查。</p>
        <p class="title">第九条    个人用户文件之提交 根据不同司法管辖区的规定，平台收集各国或者各地区之个人用户信息不尽相同，原则上，个人用户在进行平台注册时应当依据平台反洗钱相关规定提交以下信息和资料：</p>
        <p>(一)     个人姓名；</p>
        <p>(二)     家庭住址；</p>
        <p>(三)     出生日期；</p>
        <p>(四)     国籍信息；</p>
        <p>(五)     联系电话；</p>
        <p>(六)     联系电子邮箱；</p>
        <p>(七)     注册之日起前六个月以内拍摄的照片；</p>
        <p>(八)     身份证或护照复印件；</p>
        <p>(九)     其它应平台要求应当提供之信息或文件。</p>

        <p class="title">第十条 提交文件语言 平台只接受中文版本或英文版本的文件，用户提交非中文或英文文件的，应当请有资质的翻译人员翻译相关文件并进行公证。</p>
        <p class="title">第十一条 文件副本之提交 提交文件的副本的，应当和原始文件进行核对。若副本文件经过公证已被证明是原始文件的全面和真实复制版本时，该副本可以提交。本条所述之认证包括但不限于，使馆认证、司法认证、地方治安官认证、公证官认证等。</p>

        <p class="title">第十二条 照相认证 用户应当依据平台的要求进行照相认证，照相时用户需要将身份证件和自愿开户声明放置胸前进行拍照。若用户拍照模糊或不符合要求的，平台有权拒绝用户进行注册。</p>
        <p class="title">第十三条 收益人和控制人识别 平台有权对账户的实际收益人或实际控制人进行识别。机构用户注册之情形，持股该机构10%以上股份的股东需要依据平台要求提供相应资料，并进行身份验证。</p>
        <p class="title">第十四条  委托第三方身份识别 分站委托第三方机构识别用户身份的，第三方应当符合以下要求：</p>

        <p>(一)     第三方按反洗钱法律法规，和平台反洗钱相关规则，采取了用户身份识别和身份资料保存的必要措施；</p>
        <p>(二)     第三方为分站提供用户信息，不存在法律制度、技术等方面的障碍；</p>
        <p>(三)     分站在办理业务时，能立即获得第三方提供的用户信息，还可在必要时从第三方获得用户的有效身份证件、身份证明文件的原件、复印件或影印件。</p>
     

        <p class="title">第十五条 用户文件之审查 平台会依据平台反洗钱相关规定中的用户识别制度对用户所提交的相关信息进行核实和记录，若平台对于用户所提交的资料有疑问时，有权要求用户提供其它文件或向相关主管机构或部门进行核实。</p>
        <p class="title">第十六条 用户风险等级划分 根据用户所提交之材料，并考虑地域、行业、股东背景、用户是否为知名人士等因素，平台将用户发划分为低风险、中等风险和高风险三个等级。平台保留对用户进行调级的权利。</p>


        <p class="title">第十七条 高风险用户判定 高风险用户是指包括以下高风险因素并经平台综合评估后认定为高风险的用户，高风险用户因素包括：</p>

        <p>(一)     已经或正在接受刑事或行政调查的用户，不包括因民事、紧急纠纷被调查的用户；</p>
        <p>(二)     用户为知名人士，或用户的控股股东或实际控制人、实际受益人为知名人士；</p>
        <p>(三)     用户来自高风险国家或地区，或其控股股东、实际控制人、实际受益人来自高风险国家或地区；</p>
        <p>(四)     依据平台程序被确认为重点可疑用户；</p>
        <p>(五)     用户经营行业为珠宝行、股东行、贵金属交易行、货币兑换行、典当行、汇款商、夜总会、与武器相关的行业等存在较高洗钱风险的行业；</p>
        <p>(六)     用户在一定时间内频繁交易，与数字资产行情严重不符；</p>
        <p>(七)     进行其它超乎合理情形操作的用户。</p>
        <p class="title">第十八条 低风险用户判定 低风险用户是指平台综合评估后认定为低风险的用户，低风险用户因素包括：</p>
        <p>(一)     金融机构，知名公司；</p>
        <p>(二)     平台经认证充分了解且洗钱风险较低的自然人用户；</p>
        <p>(三)     经平台风控部和合规部审核认定的用户。</p>
        <p class="title">第十九条 中等风险用户判定 中等风险用户指出了本指引第十七条和第十八条规定以外的其他用户。</p>
        <p class="title">第二十条 风险等级调整 建立业务关系后，平台会持续关注用户身份和交易状况，对于出现变化、异常或对先前取得的信息发生怀疑时，平台会重新识别用户身份，适时调整用户的风险等级。平台对用户风险进行调整系平台的自由裁量权，无需向用户阐述理由。</p>
        <p class="title">第二十一条 高风险用户之监测 平台对于高风险类别的用户，会于每半年进行一次审核，更新用户身份基本信息并了解其资金来源、资金用途、经济状况或者经营状况等信息。进行高风险用户定期审核时，经综合评估后认为用户及其账户交易正常的，可调低用户风险等级。</p>
        <p class="title">第二十二条 持续的用户身份识别 业务关系存续期间，平台会采取持续的用户身份识别措施，持续关注用户交易情况，发现用户身份资料或信息已经过了有效期的，用户没有在合理期限内更新且没有提出合理理由的，平台将采取措施中止为用户服务。</p>
        <p class="title">第二十三条 重新识别用户身份 出现以下情形时，平台有权重新识别用户身份：</p>


        <p>(一)     用户要求变更姓名或名称、身份证件或者身份证明文件种类、身份证号码、注册资本、经营范围、法定代表人的；</p>
        <p>(二)     用户行为或者交易情况出现异常的；</p>
        <p>(三)     用户姓名或者名称与犯罪嫌疑人、洗钱或恐怖融资分子的姓名或者名称相同的；</p>
        <p>(四)     用户由洗钱、恐怖融资活动嫌疑的；</p>
        <p>(五)     平台获得的用户信息与先前已经掌握的相关信息存在不一致或相互矛盾的；</p>
        <p>(六)     先前获得用户信息和资料的真实性、有效性、完整性存在疑点的；</p>
        <p>(七)     平台认为应当重新识别用户身份的其它情形。</p>
        <p class="title">第二十四条 交易限额 平台有权根据交易安全性和实际情况随时设置和调整日程交易提币最高限额，和向第三方购买数字货币得限额。</p>
        <p class="title">第二十五条 可疑交易认定 平台有权对下述可疑交易和可疑账户进行核查：</p>
        <p>(一)     短期内数字资产分散转入、集中转出或者集中转入、分散转出，与用户身份、财务状况、经营业务明显不符；</p>
        <p>(二)     长期限制的账户原因不明地突然启用或者平常数字资产流量较小的账户突然有异常数字资产流入，且短期内出现大量提币；</p>
        <p>(三)     没有正常原因的多开户、销户，且销户前发生大量充币或提币；</p>
        <p>(四)     自然人账户出现一次性大额充币或提币的可疑情形；</p>
        <p>(五)     用户在一定时间内频繁交易，与数字资产行情严重不符；</p>
        <p>(六)     平台认定的其它可疑交易情形。</p>
        <p class="title">第二十六条 恐怖融资交易认定 平台怀疑用户交易或者试图进行的交易与恐怖主义、恐怖活动犯罪以及恐怖组织、恐怖分子、从事恐怖融资活动的人相关联的，无论所涉及资金金额或者财产价值大小，都会采取相应的处理措施。</p>

        <p class="title">第二十七条 可疑行为的处理 平台在进行用户身份识别时，发现以下行为的，平台有权采取暂停可疑交易、拒绝交易申请、逆转交易、冻结可疑账户，向主管部门报告等措施应对可疑行为：</p>

        <p>(一)     用户拒绝提供有效身份证件或者其它身份证明文件的；</p>
        <p>(二)     用户无正当理由拒绝更新用户基本信息的；</p>
        <p>(三)     采取必要措施后，仍怀疑先前获得的用户身份资料的真实性、有效性、完整性的；</p>
        <p>(四)     用户伪造、变造身份证明文件欺骗平台开户的；</p>
        <p>(五)     用户拒绝为可疑行为提供合理解释或其解释明显超出合理情形的。</p>

        <p class="title">第二十八条 用户资料保存制度 平台建立用户身份资料与交易记录保存制度，妥善保管用户身份资料、交易记录等文件资料和数据，便于反洗钱调查和监督管理。防止用户身份资料和交易记录缺失、损毁、防止泄露用户身份信息和交易信息。</p>
        <p class="title">第二十九条 用户资料与交易记录保存范围 平台所保存用户身份资料和交易资料包括加载用户身份信息、资料以及反映平台开展用户身份识别工作情况的各种记录和资料，以及每笔交易的数据信息及反映交易真实情况的其它资料。</p>
        <p class="title">第三十条 用户身份资料与交易记录的保存期限 平台按照下列期限保存用户身份资料和交易记录：</p>
        <p>(一)     用户身份资料，自业务关系结束当日起至少保存五年；</p>
        <p>(二)     交易记录，自交易记账当年起至少保存五年；</p>
        <p>(三)     如果用户身份资料和交易记录涉及正在被反洗钱调查的可疑交易活动，且反洗钱调查工作在前款规定的最低保存期届满时仍未结束的，平台会将其保存至反洗钱调查工作结束；</p>
        <p class="title">第三十一条 司法调查协助 若某一国家和地区的司法机关、执法机关或其它有管理权限的主管机关向平台提出协查要求时，平台有权配合其调查，并依据其要求提供相应的信息和资料。</p>
        <p class="title">第三十二条 反洗钱保密之规定 因履行反洗钱职责或因工作原因获知有关反洗钱信息的平台人员应严格遵守保密规定，对获得的用户身份资料、可疑交易、恐怖融资交易等信息予以保密。非以法律规定，不得向任何组织和个人和平台非相关工作人员提供信息。</p>
        
        <p class="title">第三十三条 用户之注意 用户应当注意以下事项：</p>
        
        <p>(一)     禁止将用户本人的账号出借给他人使用；</p>
        <p>(二)     禁止出租、出借用户本人身份证件；</p>
        <p>(三)     禁止出租、出借、透露用户本人的账户、密码等重要个人财产信息；</p>
        <p>(四)     用户应当主动配合平台进行用户身份识别；</p>
        <p>(五)     在平台进行交易时，选择并使用安全可靠的第三方金融机构进行支付活动。</p>

        <p class="title"> 第三十四条 可疑行为之报告 若平台用户在平台交易时发现任何账户可能从事洗钱或恐怖融资活动，用户可以向平台进行报告。</p>
        <p class="title">第三十五条 指引之解释 本指引由平台进行解释。</p>
        <p class="title"> 第三十六条 生效期 本指引自发布之日起实施。</p>
    </div>
        </template>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
export default {
  components: {
    ModelFull
  },
  data() {
    return {
      config,
      title: "",
      path: "",
      oHeight: 0
    };
  },
  created() {
    let fanxiqian = "fanxi.html";
    let xieyi = "xieyi.html";
    this.title =
      this.$route.query.xieyi == 1
        ? this.$t("my.myInfo.text4")
        : this.$t("my.myInfo.text21");
    this.path =
      "https://h1.ihuobi.cc/buy/rules/" +
      (this.$lang == "en" ? "en/" : "") +
      (this.$route.query.xieyi == 1 ? xieyi : fanxiqian);
  },
  mounted() {
    this.oHeight = document.body.clientHeight - 57;
  }
};
</script>
<style lang="less" scoped>
.model {
  min-height: 100%;
  background: @bodyBg;
  .main_page {
    min-height: 100%;
    // overflow: hidden;;
    .single-content {
      padding: 20px 12px;
      .title {
        font-size: 14px;
      }
      p {
        line-height: 24px;
        font-size: 12px;
      }
    }
  }
}
</style>
