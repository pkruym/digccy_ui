import * as $protobuf from "protobufjs";
/** 指令类型 */
export enum Command {
    NONE = 0,
    AUTH = 1,
    PINGREQ = 2,
    PONG = 3,
    SUBSCRIBE = 4,
    SUBACK = 5,
    UNSUBSCRIBE = 6,
    UNSUBACK = 7,
    PUSH = 8,
    AUTH_BACK = 9
}

/** Properties of a Message. */
export interface IMessage {

    /** Message cmd */
    cmd?: (Command|null);

    /** Message type */
    type?: (number|null);

    /** Message commodityNo */
    commodityNo?: (string|null);

    /** Message contractNo */
    contractNo?: (string|null);

    /** Message timeVal */
    timeVal?: (string|null);

    /** Message payload */
    payload?: (google.protobuf.IAny[]|null);
}

/** Represents a Message. */
export class Message implements IMessage {

    /**
     * Constructs a new Message.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMessage);

    /** Message cmd. */
    public cmd: Command;

    /** Message type. */
    public type: number;

    /** Message commodityNo. */
    public commodityNo: string;

    /** Message contractNo. */
    public contractNo: string;

    /** Message timeVal. */
    public timeVal: string;

    /** Message payload. */
    public payload: google.protobuf.IAny[];

    /**
     * Creates a new Message instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Message instance
     */
    public static create(properties?: IMessage): Message;

    /**
     * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
     * @param message Message message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
     * @param message Message message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Message;

    /**
     * Decodes a Message message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Message;

    /**
     * Verifies a Message message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Message message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Message
     */
    public static fromObject(object: { [k: string]: any }): Message;

    /**
     * Creates a plain object from a Message message. Also converts values to other types if specified.
     * @param message Message
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Message to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FuturesContractLineData. */
export interface IFuturesContractLineData {

    /** FuturesContractLineData scale */
    scale?: (number|null);

    /** FuturesContractLineData commodityNo */
    commodityNo?: (string|null);

    /** FuturesContractLineData contractNo */
    contractNo?: (string|null);

    /** FuturesContractLineData timestamp */
    timestamp?: (number|Long|null);

    /** FuturesContractLineData timeStr */
    timeStr?: (string|null);

    /** FuturesContractLineData openPrice */
    openPrice?: (string|null);

    /** FuturesContractLineData highPrice */
    highPrice?: (string|null);

    /** FuturesContractLineData lowPrice */
    lowPrice?: (string|null);

    /** FuturesContractLineData closePrice */
    closePrice?: (string|null);

    /** FuturesContractLineData volume */
    volume?: (number|Long|null);

    /** FuturesContractLineData totalVolume */
    totalVolume?: (number|Long|null);

    /** FuturesContractLineData qTotalQty */
    qTotalQty?: (number|Long|null);

    /** FuturesContractLineData isFull */
    isFull?: (boolean|null);

    /** FuturesContractLineData type */
    type?: (number|null);

    /** FuturesContractLineData timeVal */
    timeVal?: (number|null);

    /** FuturesContractLineData avgValue */
    avgValue?: (string|null);

    /** FuturesContractLineData startTime */
    startTime?: (string|null);

    /** FuturesContractLineData endTime */
    endTime?: (string|null);

    /** FuturesContractLineData currentTime */
    currentTime?: (number|Long|null);
}

/** Represents a FuturesContractLineData. */
export class FuturesContractLineData implements IFuturesContractLineData {

    /**
     * Constructs a new FuturesContractLineData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFuturesContractLineData);

    /** FuturesContractLineData scale. */
    public scale: number;

    /** FuturesContractLineData commodityNo. */
    public commodityNo: string;

    /** FuturesContractLineData contractNo. */
    public contractNo: string;

    /** FuturesContractLineData timestamp. */
    public timestamp: (number|Long);

    /** FuturesContractLineData timeStr. */
    public timeStr: string;

    /** FuturesContractLineData openPrice. */
    public openPrice: string;

    /** FuturesContractLineData highPrice. */
    public highPrice: string;

    /** FuturesContractLineData lowPrice. */
    public lowPrice: string;

    /** FuturesContractLineData closePrice. */
    public closePrice: string;

    /** FuturesContractLineData volume. */
    public volume: (number|Long);

    /** FuturesContractLineData totalVolume. */
    public totalVolume: (number|Long);

    /** FuturesContractLineData qTotalQty. */
    public qTotalQty: (number|Long);

    /** FuturesContractLineData isFull. */
    public isFull: boolean;

    /** FuturesContractLineData type. */
    public type: number;

    /** FuturesContractLineData timeVal. */
    public timeVal: number;

    /** FuturesContractLineData avgValue. */
    public avgValue: string;

    /** FuturesContractLineData startTime. */
    public startTime: string;

    /** FuturesContractLineData endTime. */
    public endTime: string;

    /** FuturesContractLineData currentTime. */
    public currentTime: (number|Long);

    /**
     * Creates a new FuturesContractLineData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FuturesContractLineData instance
     */
    public static create(properties?: IFuturesContractLineData): FuturesContractLineData;

    /**
     * Encodes the specified FuturesContractLineData message. Does not implicitly {@link FuturesContractLineData.verify|verify} messages.
     * @param message FuturesContractLineData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFuturesContractLineData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FuturesContractLineData message, length delimited. Does not implicitly {@link FuturesContractLineData.verify|verify} messages.
     * @param message FuturesContractLineData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFuturesContractLineData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FuturesContractLineData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FuturesContractLineData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FuturesContractLineData;

    /**
     * Decodes a FuturesContractLineData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FuturesContractLineData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FuturesContractLineData;

    /**
     * Verifies a FuturesContractLineData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FuturesContractLineData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FuturesContractLineData
     */
    public static fromObject(object: { [k: string]: any }): FuturesContractLineData;

    /**
     * Creates a plain object from a FuturesContractLineData message. Also converts values to other types if specified.
     * @param message FuturesContractLineData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FuturesContractLineData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FuturesContractLineData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FuturesQuoteSimpleDataBase. */
export interface IFuturesQuoteSimpleDataBase {

    /** FuturesQuoteSimpleDataBase time */
    time?: (string|null);

    /** FuturesQuoteSimpleDataBase commodityNo */
    commodityNo?: (string|null);

    /** FuturesQuoteSimpleDataBase contractNo */
    contractNo?: (string|null);

    /** FuturesQuoteSimpleDataBase lastPrice */
    lastPrice?: (string|null);

    /** FuturesQuoteSimpleDataBase openPrice */
    openPrice?: (string|null);

    /** FuturesQuoteSimpleDataBase highPrice */
    highPrice?: (string|null);

    /** FuturesQuoteSimpleDataBase lowPrice */
    lowPrice?: (string|null);

    /** FuturesQuoteSimpleDataBase closePrice */
    closePrice?: (string|null);

    /** FuturesQuoteSimpleDataBase bidPrice */
    bidPrice?: (string|null);

    /** FuturesQuoteSimpleDataBase bidSize */
    bidSize?: (number|Long|null);

    /** FuturesQuoteSimpleDataBase askPrice */
    askPrice?: (string|null);

    /** FuturesQuoteSimpleDataBase askSize */
    askSize?: (number|Long|null);

    /** FuturesQuoteSimpleDataBase nowClosePrice */
    nowClosePrice?: (string|null);

    /** FuturesQuoteSimpleDataBase preSettlePrice */
    preSettlePrice?: (string|null);

    /** FuturesQuoteSimpleDataBase totalQty */
    totalQty?: (number|Long|null);

    /** FuturesQuoteSimpleDataBase positionQty */
    positionQty?: (number|Long|null);

    /** FuturesQuoteSimpleDataBase prePositionQty */
    prePositionQty?: (number|Long|null);

    /** FuturesQuoteSimpleDataBase currentTime */
    currentTime?: (number|Long|null);
}

/** Represents a FuturesQuoteSimpleDataBase. */
export class FuturesQuoteSimpleDataBase implements IFuturesQuoteSimpleDataBase {

    /**
     * Constructs a new FuturesQuoteSimpleDataBase.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFuturesQuoteSimpleDataBase);

    /** FuturesQuoteSimpleDataBase time. */
    public time: string;

    /** FuturesQuoteSimpleDataBase commodityNo. */
    public commodityNo: string;

    /** FuturesQuoteSimpleDataBase contractNo. */
    public contractNo: string;

    /** FuturesQuoteSimpleDataBase lastPrice. */
    public lastPrice: string;

    /** FuturesQuoteSimpleDataBase openPrice. */
    public openPrice: string;

    /** FuturesQuoteSimpleDataBase highPrice. */
    public highPrice: string;

    /** FuturesQuoteSimpleDataBase lowPrice. */
    public lowPrice: string;

    /** FuturesQuoteSimpleDataBase closePrice. */
    public closePrice: string;

    /** FuturesQuoteSimpleDataBase bidPrice. */
    public bidPrice: string;

    /** FuturesQuoteSimpleDataBase bidSize. */
    public bidSize: (number|Long);

    /** FuturesQuoteSimpleDataBase askPrice. */
    public askPrice: string;

    /** FuturesQuoteSimpleDataBase askSize. */
    public askSize: (number|Long);

    /** FuturesQuoteSimpleDataBase nowClosePrice. */
    public nowClosePrice: string;

    /** FuturesQuoteSimpleDataBase preSettlePrice. */
    public preSettlePrice: string;

    /** FuturesQuoteSimpleDataBase totalQty. */
    public totalQty: (number|Long);

    /** FuturesQuoteSimpleDataBase positionQty. */
    public positionQty: (number|Long);

    /** FuturesQuoteSimpleDataBase prePositionQty. */
    public prePositionQty: (number|Long);

    /** FuturesQuoteSimpleDataBase currentTime. */
    public currentTime: (number|Long);

    /**
     * Creates a new FuturesQuoteSimpleDataBase instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FuturesQuoteSimpleDataBase instance
     */
    public static create(properties?: IFuturesQuoteSimpleDataBase): FuturesQuoteSimpleDataBase;

    /**
     * Encodes the specified FuturesQuoteSimpleDataBase message. Does not implicitly {@link FuturesQuoteSimpleDataBase.verify|verify} messages.
     * @param message FuturesQuoteSimpleDataBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFuturesQuoteSimpleDataBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FuturesQuoteSimpleDataBase message, length delimited. Does not implicitly {@link FuturesQuoteSimpleDataBase.verify|verify} messages.
     * @param message FuturesQuoteSimpleDataBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFuturesQuoteSimpleDataBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FuturesQuoteSimpleDataBase message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FuturesQuoteSimpleDataBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FuturesQuoteSimpleDataBase;

    /**
     * Decodes a FuturesQuoteSimpleDataBase message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FuturesQuoteSimpleDataBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FuturesQuoteSimpleDataBase;

    /**
     * Verifies a FuturesQuoteSimpleDataBase message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FuturesQuoteSimpleDataBase message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FuturesQuoteSimpleDataBase
     */
    public static fromObject(object: { [k: string]: any }): FuturesQuoteSimpleDataBase;

    /**
     * Creates a plain object from a FuturesQuoteSimpleDataBase message. Also converts values to other types if specified.
     * @param message FuturesQuoteSimpleDataBase
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FuturesQuoteSimpleDataBase, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FuturesQuoteSimpleDataBase to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FuturesQuoteDataBase. */
export interface IFuturesQuoteDataBase {

    /** FuturesQuoteDataBase time */
    time?: (string|null);

    /** FuturesQuoteDataBase commodityNo */
    commodityNo?: (string|null);

    /** FuturesQuoteDataBase contractNo */
    contractNo?: (string|null);

    /** FuturesQuoteDataBase bidPrice */
    bidPrice?: (string|null);

    /** FuturesQuoteDataBase bidPrice2 */
    bidPrice2?: (string|null);

    /** FuturesQuoteDataBase bidPrice3 */
    bidPrice3?: (string|null);

    /** FuturesQuoteDataBase bidPrice4 */
    bidPrice4?: (string|null);

    /** FuturesQuoteDataBase bidPrice5 */
    bidPrice5?: (string|null);

    /** FuturesQuoteDataBase bidSize */
    bidSize?: (number|Long|null);

    /** FuturesQuoteDataBase bidSize2 */
    bidSize2?: (number|Long|null);

    /** FuturesQuoteDataBase bidSize3 */
    bidSize3?: (number|Long|null);

    /** FuturesQuoteDataBase bidSize4 */
    bidSize4?: (number|Long|null);

    /** FuturesQuoteDataBase bidSize5 */
    bidSize5?: (number|Long|null);

    /** FuturesQuoteDataBase askPrice */
    askPrice?: (string|null);

    /** FuturesQuoteDataBase askPrice2 */
    askPrice2?: (string|null);

    /** FuturesQuoteDataBase askPrice3 */
    askPrice3?: (string|null);

    /** FuturesQuoteDataBase askPrice4 */
    askPrice4?: (string|null);

    /** FuturesQuoteDataBase askPrice5 */
    askPrice5?: (string|null);

    /** FuturesQuoteDataBase askSize */
    askSize?: (number|Long|null);

    /** FuturesQuoteDataBase askSize2 */
    askSize2?: (number|Long|null);

    /** FuturesQuoteDataBase askSize3 */
    askSize3?: (number|Long|null);

    /** FuturesQuoteDataBase askSize4 */
    askSize4?: (number|Long|null);

    /** FuturesQuoteDataBase askSize5 */
    askSize5?: (number|Long|null);

    /** FuturesQuoteDataBase lastPrice */
    lastPrice?: (string|null);

    /** FuturesQuoteDataBase lastSize */
    lastSize?: (number|Long|null);

    /** FuturesQuoteDataBase openPrice */
    openPrice?: (string|null);

    /** FuturesQuoteDataBase highPrice */
    highPrice?: (string|null);

    /** FuturesQuoteDataBase lowPrice */
    lowPrice?: (string|null);

    /** FuturesQuoteDataBase closePrice */
    closePrice?: (string|null);

    /** FuturesQuoteDataBase volume */
    volume?: (number|Long|null);

    /** FuturesQuoteDataBase totalVolume */
    totalVolume?: (number|Long|null);

    /** FuturesQuoteDataBase nowClosePrice */
    nowClosePrice?: (string|null);

    /** FuturesQuoteDataBase preSettlePrice */
    preSettlePrice?: (string|null);

    /** FuturesQuoteDataBase totalQty */
    totalQty?: (number|Long|null);

    /** FuturesQuoteDataBase positionQty */
    positionQty?: (number|Long|null);

    /** FuturesQuoteDataBase prePositionQty */
    prePositionQty?: (number|Long|null);

    /** FuturesQuoteDataBase currentTime */
    currentTime?: (number|Long|null);
}

/** Represents a FuturesQuoteDataBase. */
export class FuturesQuoteDataBase implements IFuturesQuoteDataBase {

    /**
     * Constructs a new FuturesQuoteDataBase.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFuturesQuoteDataBase);

    /** FuturesQuoteDataBase time. */
    public time: string;

    /** FuturesQuoteDataBase commodityNo. */
    public commodityNo: string;

    /** FuturesQuoteDataBase contractNo. */
    public contractNo: string;

    /** FuturesQuoteDataBase bidPrice. */
    public bidPrice: string;

    /** FuturesQuoteDataBase bidPrice2. */
    public bidPrice2: string;

    /** FuturesQuoteDataBase bidPrice3. */
    public bidPrice3: string;

    /** FuturesQuoteDataBase bidPrice4. */
    public bidPrice4: string;

    /** FuturesQuoteDataBase bidPrice5. */
    public bidPrice5: string;

    /** FuturesQuoteDataBase bidSize. */
    public bidSize: (number|Long);

    /** FuturesQuoteDataBase bidSize2. */
    public bidSize2: (number|Long);

    /** FuturesQuoteDataBase bidSize3. */
    public bidSize3: (number|Long);

    /** FuturesQuoteDataBase bidSize4. */
    public bidSize4: (number|Long);

    /** FuturesQuoteDataBase bidSize5. */
    public bidSize5: (number|Long);

    /** FuturesQuoteDataBase askPrice. */
    public askPrice: string;

    /** FuturesQuoteDataBase askPrice2. */
    public askPrice2: string;

    /** FuturesQuoteDataBase askPrice3. */
    public askPrice3: string;

    /** FuturesQuoteDataBase askPrice4. */
    public askPrice4: string;

    /** FuturesQuoteDataBase askPrice5. */
    public askPrice5: string;

    /** FuturesQuoteDataBase askSize. */
    public askSize: (number|Long);

    /** FuturesQuoteDataBase askSize2. */
    public askSize2: (number|Long);

    /** FuturesQuoteDataBase askSize3. */
    public askSize3: (number|Long);

    /** FuturesQuoteDataBase askSize4. */
    public askSize4: (number|Long);

    /** FuturesQuoteDataBase askSize5. */
    public askSize5: (number|Long);

    /** FuturesQuoteDataBase lastPrice. */
    public lastPrice: string;

    /** FuturesQuoteDataBase lastSize. */
    public lastSize: (number|Long);

    /** FuturesQuoteDataBase openPrice. */
    public openPrice: string;

    /** FuturesQuoteDataBase highPrice. */
    public highPrice: string;

    /** FuturesQuoteDataBase lowPrice. */
    public lowPrice: string;

    /** FuturesQuoteDataBase closePrice. */
    public closePrice: string;

    /** FuturesQuoteDataBase volume. */
    public volume: (number|Long);

    /** FuturesQuoteDataBase totalVolume. */
    public totalVolume: (number|Long);

    /** FuturesQuoteDataBase nowClosePrice. */
    public nowClosePrice: string;

    /** FuturesQuoteDataBase preSettlePrice. */
    public preSettlePrice: string;

    /** FuturesQuoteDataBase totalQty. */
    public totalQty: (number|Long);

    /** FuturesQuoteDataBase positionQty. */
    public positionQty: (number|Long);

    /** FuturesQuoteDataBase prePositionQty. */
    public prePositionQty: (number|Long);

    /** FuturesQuoteDataBase currentTime. */
    public currentTime: (number|Long);

    /**
     * Creates a new FuturesQuoteDataBase instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FuturesQuoteDataBase instance
     */
    public static create(properties?: IFuturesQuoteDataBase): FuturesQuoteDataBase;

    /**
     * Encodes the specified FuturesQuoteDataBase message. Does not implicitly {@link FuturesQuoteDataBase.verify|verify} messages.
     * @param message FuturesQuoteDataBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFuturesQuoteDataBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FuturesQuoteDataBase message, length delimited. Does not implicitly {@link FuturesQuoteDataBase.verify|verify} messages.
     * @param message FuturesQuoteDataBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFuturesQuoteDataBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FuturesQuoteDataBase message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FuturesQuoteDataBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FuturesQuoteDataBase;

    /**
     * Decodes a FuturesQuoteDataBase message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FuturesQuoteDataBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FuturesQuoteDataBase;

    /**
     * Verifies a FuturesQuoteDataBase message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FuturesQuoteDataBase message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FuturesQuoteDataBase
     */
    public static fromObject(object: { [k: string]: any }): FuturesQuoteDataBase;

    /**
     * Creates a plain object from a FuturesQuoteDataBase message. Also converts values to other types if specified.
     * @param message FuturesQuoteDataBase
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FuturesQuoteDataBase, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FuturesQuoteDataBase to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Bundle. */
export interface IBundle {

    /** Bundle pack */
    pack?: (string|null);
}

/** Represents a Bundle. */
export class Bundle implements IBundle {

    /**
     * Constructs a new Bundle.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBundle);

    /** Bundle pack. */
    public pack: string;

    /**
     * Creates a new Bundle instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Bundle instance
     */
    public static create(properties?: IBundle): Bundle;

    /**
     * Encodes the specified Bundle message. Does not implicitly {@link Bundle.verify|verify} messages.
     * @param message Bundle message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBundle, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Bundle message, length delimited. Does not implicitly {@link Bundle.verify|verify} messages.
     * @param message Bundle message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBundle, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Bundle message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Bundle
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Bundle;

    /**
     * Decodes a Bundle message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Bundle
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Bundle;

    /**
     * Verifies a Bundle message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Bundle message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Bundle
     */
    public static fromObject(object: { [k: string]: any }): Bundle;

    /**
     * Creates a plain object from a Bundle message. Also converts values to other types if specified.
     * @param message Bundle
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Bundle, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Bundle to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FuturesQuoteFullDataBase. */
export interface IFuturesQuoteFullDataBase {

    /** FuturesQuoteFullDataBase time */
    time?: (string|null);

    /** FuturesQuoteFullDataBase commodityNo */
    commodityNo?: (string|null);

    /** FuturesQuoteFullDataBase contractNo */
    contractNo?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice */
    bidPrice?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice2 */
    bidPrice2?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice3 */
    bidPrice3?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice4 */
    bidPrice4?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice5 */
    bidPrice5?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice6 */
    bidPrice6?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice7 */
    bidPrice7?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice8 */
    bidPrice8?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice9 */
    bidPrice9?: (string|null);

    /** FuturesQuoteFullDataBase bidPrice10 */
    bidPrice10?: (string|null);

    /** FuturesQuoteFullDataBase bidSize */
    bidSize?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize2 */
    bidSize2?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize3 */
    bidSize3?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize4 */
    bidSize4?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize5 */
    bidSize5?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize6 */
    bidSize6?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize7 */
    bidSize7?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize8 */
    bidSize8?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize9 */
    bidSize9?: (number|Long|null);

    /** FuturesQuoteFullDataBase bidSize10 */
    bidSize10?: (number|Long|null);

    /** FuturesQuoteFullDataBase askPrice */
    askPrice?: (string|null);

    /** FuturesQuoteFullDataBase askPrice2 */
    askPrice2?: (string|null);

    /** FuturesQuoteFullDataBase askPrice3 */
    askPrice3?: (string|null);

    /** FuturesQuoteFullDataBase askPrice4 */
    askPrice4?: (string|null);

    /** FuturesQuoteFullDataBase askPrice5 */
    askPrice5?: (string|null);

    /** FuturesQuoteFullDataBase askPrice6 */
    askPrice6?: (string|null);

    /** FuturesQuoteFullDataBase askPrice7 */
    askPrice7?: (string|null);

    /** FuturesQuoteFullDataBase askPrice8 */
    askPrice8?: (string|null);

    /** FuturesQuoteFullDataBase askPrice9 */
    askPrice9?: (string|null);

    /** FuturesQuoteFullDataBase askPrice10 */
    askPrice10?: (string|null);

    /** FuturesQuoteFullDataBase askSize */
    askSize?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize2 */
    askSize2?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize3 */
    askSize3?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize4 */
    askSize4?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize5 */
    askSize5?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize6 */
    askSize6?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize7 */
    askSize7?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize8 */
    askSize8?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize9 */
    askSize9?: (number|Long|null);

    /** FuturesQuoteFullDataBase askSize10 */
    askSize10?: (number|Long|null);

    /** FuturesQuoteFullDataBase lastPrice */
    lastPrice?: (string|null);

    /** FuturesQuoteFullDataBase lastSize */
    lastSize?: (number|Long|null);

    /** FuturesQuoteFullDataBase openPrice */
    openPrice?: (string|null);

    /** FuturesQuoteFullDataBase highPrice */
    highPrice?: (string|null);

    /** FuturesQuoteFullDataBase lowPrice */
    lowPrice?: (string|null);

    /** FuturesQuoteFullDataBase nowClosePrice */
    nowClosePrice?: (string|null);

    /** FuturesQuoteFullDataBase closePrice */
    closePrice?: (string|null);

    /** FuturesQuoteFullDataBase volume */
    volume?: (number|Long|null);

    /** FuturesQuoteFullDataBase totalVolume */
    totalVolume?: (number|Long|null);

    /** FuturesQuoteFullDataBase preSettlePrice */
    preSettlePrice?: (string|null);

    /** FuturesQuoteFullDataBase totalQty */
    totalQty?: (number|Long|null);

    /** FuturesQuoteFullDataBase positionQty */
    positionQty?: (number|Long|null);

    /** FuturesQuoteFullDataBase prePositionQty */
    prePositionQty?: (number|Long|null);

    /** FuturesQuoteFullDataBase currentTime */
    currentTime?: (number|Long|null);
}

/** Represents a FuturesQuoteFullDataBase. */
export class FuturesQuoteFullDataBase implements IFuturesQuoteFullDataBase {

    /**
     * Constructs a new FuturesQuoteFullDataBase.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFuturesQuoteFullDataBase);

    /** FuturesQuoteFullDataBase time. */
    public time: string;

    /** FuturesQuoteFullDataBase commodityNo. */
    public commodityNo: string;

    /** FuturesQuoteFullDataBase contractNo. */
    public contractNo: string;

    /** FuturesQuoteFullDataBase bidPrice. */
    public bidPrice: string;

    /** FuturesQuoteFullDataBase bidPrice2. */
    public bidPrice2: string;

    /** FuturesQuoteFullDataBase bidPrice3. */
    public bidPrice3: string;

    /** FuturesQuoteFullDataBase bidPrice4. */
    public bidPrice4: string;

    /** FuturesQuoteFullDataBase bidPrice5. */
    public bidPrice5: string;

    /** FuturesQuoteFullDataBase bidPrice6. */
    public bidPrice6: string;

    /** FuturesQuoteFullDataBase bidPrice7. */
    public bidPrice7: string;

    /** FuturesQuoteFullDataBase bidPrice8. */
    public bidPrice8: string;

    /** FuturesQuoteFullDataBase bidPrice9. */
    public bidPrice9: string;

    /** FuturesQuoteFullDataBase bidPrice10. */
    public bidPrice10: string;

    /** FuturesQuoteFullDataBase bidSize. */
    public bidSize: (number|Long);

    /** FuturesQuoteFullDataBase bidSize2. */
    public bidSize2: (number|Long);

    /** FuturesQuoteFullDataBase bidSize3. */
    public bidSize3: (number|Long);

    /** FuturesQuoteFullDataBase bidSize4. */
    public bidSize4: (number|Long);

    /** FuturesQuoteFullDataBase bidSize5. */
    public bidSize5: (number|Long);

    /** FuturesQuoteFullDataBase bidSize6. */
    public bidSize6: (number|Long);

    /** FuturesQuoteFullDataBase bidSize7. */
    public bidSize7: (number|Long);

    /** FuturesQuoteFullDataBase bidSize8. */
    public bidSize8: (number|Long);

    /** FuturesQuoteFullDataBase bidSize9. */
    public bidSize9: (number|Long);

    /** FuturesQuoteFullDataBase bidSize10. */
    public bidSize10: (number|Long);

    /** FuturesQuoteFullDataBase askPrice. */
    public askPrice: string;

    /** FuturesQuoteFullDataBase askPrice2. */
    public askPrice2: string;

    /** FuturesQuoteFullDataBase askPrice3. */
    public askPrice3: string;

    /** FuturesQuoteFullDataBase askPrice4. */
    public askPrice4: string;

    /** FuturesQuoteFullDataBase askPrice5. */
    public askPrice5: string;

    /** FuturesQuoteFullDataBase askPrice6. */
    public askPrice6: string;

    /** FuturesQuoteFullDataBase askPrice7. */
    public askPrice7: string;

    /** FuturesQuoteFullDataBase askPrice8. */
    public askPrice8: string;

    /** FuturesQuoteFullDataBase askPrice9. */
    public askPrice9: string;

    /** FuturesQuoteFullDataBase askPrice10. */
    public askPrice10: string;

    /** FuturesQuoteFullDataBase askSize. */
    public askSize: (number|Long);

    /** FuturesQuoteFullDataBase askSize2. */
    public askSize2: (number|Long);

    /** FuturesQuoteFullDataBase askSize3. */
    public askSize3: (number|Long);

    /** FuturesQuoteFullDataBase askSize4. */
    public askSize4: (number|Long);

    /** FuturesQuoteFullDataBase askSize5. */
    public askSize5: (number|Long);

    /** FuturesQuoteFullDataBase askSize6. */
    public askSize6: (number|Long);

    /** FuturesQuoteFullDataBase askSize7. */
    public askSize7: (number|Long);

    /** FuturesQuoteFullDataBase askSize8. */
    public askSize8: (number|Long);

    /** FuturesQuoteFullDataBase askSize9. */
    public askSize9: (number|Long);

    /** FuturesQuoteFullDataBase askSize10. */
    public askSize10: (number|Long);

    /** FuturesQuoteFullDataBase lastPrice. */
    public lastPrice: string;

    /** FuturesQuoteFullDataBase lastSize. */
    public lastSize: (number|Long);

    /** FuturesQuoteFullDataBase openPrice. */
    public openPrice: string;

    /** FuturesQuoteFullDataBase highPrice. */
    public highPrice: string;

    /** FuturesQuoteFullDataBase lowPrice. */
    public lowPrice: string;

    /** FuturesQuoteFullDataBase nowClosePrice. */
    public nowClosePrice: string;

    /** FuturesQuoteFullDataBase closePrice. */
    public closePrice: string;

    /** FuturesQuoteFullDataBase volume. */
    public volume: (number|Long);

    /** FuturesQuoteFullDataBase totalVolume. */
    public totalVolume: (number|Long);

    /** FuturesQuoteFullDataBase preSettlePrice. */
    public preSettlePrice: string;

    /** FuturesQuoteFullDataBase totalQty. */
    public totalQty: (number|Long);

    /** FuturesQuoteFullDataBase positionQty. */
    public positionQty: (number|Long);

    /** FuturesQuoteFullDataBase prePositionQty. */
    public prePositionQty: (number|Long);

    /** FuturesQuoteFullDataBase currentTime. */
    public currentTime: (number|Long);

    /**
     * Creates a new FuturesQuoteFullDataBase instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FuturesQuoteFullDataBase instance
     */
    public static create(properties?: IFuturesQuoteFullDataBase): FuturesQuoteFullDataBase;

    /**
     * Encodes the specified FuturesQuoteFullDataBase message. Does not implicitly {@link FuturesQuoteFullDataBase.verify|verify} messages.
     * @param message FuturesQuoteFullDataBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFuturesQuoteFullDataBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FuturesQuoteFullDataBase message, length delimited. Does not implicitly {@link FuturesQuoteFullDataBase.verify|verify} messages.
     * @param message FuturesQuoteFullDataBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFuturesQuoteFullDataBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FuturesQuoteFullDataBase message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FuturesQuoteFullDataBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FuturesQuoteFullDataBase;

    /**
     * Decodes a FuturesQuoteFullDataBase message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FuturesQuoteFullDataBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FuturesQuoteFullDataBase;

    /**
     * Verifies a FuturesQuoteFullDataBase message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FuturesQuoteFullDataBase message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FuturesQuoteFullDataBase
     */
    public static fromObject(object: { [k: string]: any }): FuturesQuoteFullDataBase;

    /**
     * Creates a plain object from a FuturesQuoteFullDataBase message. Also converts values to other types if specified.
     * @param message FuturesQuoteFullDataBase
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FuturesQuoteFullDataBase, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FuturesQuoteFullDataBase to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
