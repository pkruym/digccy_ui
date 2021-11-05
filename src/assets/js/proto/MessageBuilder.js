/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    /**
     * 指令类型
     * @exports Command
     * @enum {string}
     * @property {number} NONE=0 NONE value
     * @property {number} AUTH=1 AUTH value
     * @property {number} PINGREQ=2 PINGREQ value
     * @property {number} PONG=3 PONG value
     * @property {number} SUBSCRIBE=4 SUBSCRIBE value
     * @property {number} SUBACK=5 SUBACK value
     * @property {number} UNSUBSCRIBE=6 UNSUBSCRIBE value
     * @property {number} UNSUBACK=7 UNSUBACK value
     * @property {number} PUSH=8 PUSH value
     * @property {number} AUTH_BACK=9 AUTH_BACK value
     */
    $root.Command = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "AUTH"] = 1;
        values[valuesById[2] = "PINGREQ"] = 2;
        values[valuesById[3] = "PONG"] = 3;
        values[valuesById[4] = "SUBSCRIBE"] = 4;
        values[valuesById[5] = "SUBACK"] = 5;
        values[valuesById[6] = "UNSUBSCRIBE"] = 6;
        values[valuesById[7] = "UNSUBACK"] = 7;
        values[valuesById[8] = "PUSH"] = 8;
        values[valuesById[9] = "AUTH_BACK"] = 9;
        return values;
    })();
    
    $root.Message = (function() {
    
        /**
         * Properties of a Message.
         * @exports IMessage
         * @interface IMessage
         * @property {Command|null} [cmd] Message cmd
         * @property {number|null} [type] Message type
         * @property {string|null} [commodityNo] Message commodityNo
         * @property {string|null} [contractNo] Message contractNo
         * @property {string|null} [timeVal] Message timeVal
         * @property {Array.<google.protobuf.IAny>|null} [payload] Message payload
         */
    
        /**
         * Constructs a new Message.
         * @exports Message
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            this.payload = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Message cmd.
         * @member {Command} cmd
         * @memberof Message
         * @instance
         */
        Message.prototype.cmd = 0;
    
        /**
         * Message type.
         * @member {number} type
         * @memberof Message
         * @instance
         */
        Message.prototype.type = 0;
    
        /**
         * Message commodityNo.
         * @member {string} commodityNo
         * @memberof Message
         * @instance
         */
        Message.prototype.commodityNo = "";
    
        /**
         * Message contractNo.
         * @member {string} contractNo
         * @memberof Message
         * @instance
         */
        Message.prototype.contractNo = "";
    
        /**
         * Message timeVal.
         * @member {string} timeVal
         * @memberof Message
         * @instance
         */
        Message.prototype.timeVal = "";
    
        /**
         * Message payload.
         * @member {Array.<google.protobuf.IAny>} payload
         * @memberof Message
         * @instance
         */
        Message.prototype.payload = $util.emptyArray;
    
        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof Message
         * @static
         * @param {IMessage=} [properties] Properties to set
         * @returns {Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };
    
        /**
         * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
         * @function encode
         * @memberof Message
         * @static
         * @param {IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cmd);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.commodityNo);
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.contractNo);
            if (message.timeVal != null && message.hasOwnProperty("timeVal"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.timeVal);
            if (message.payload != null && message.payload.length)
                for (var i = 0; i < message.payload.length; ++i)
                    $root.google.protobuf.Any.encode(message.payload[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Message
         * @static
         * @param {IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cmd = reader.int32();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.commodityNo = reader.string();
                    break;
                case 4:
                    message.contractNo = reader.string();
                    break;
                case 5:
                    message.timeVal = reader.string();
                    break;
                case 6:
                    if (!(message.payload && message.payload.length))
                        message.payload = [];
                    message.payload.push($root.google.protobuf.Any.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Message message.
         * @function verify
         * @memberof Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                switch (message.cmd) {
                default:
                    return "cmd: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                if (!$util.isString(message.commodityNo))
                    return "commodityNo: string expected";
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                if (!$util.isString(message.contractNo))
                    return "contractNo: string expected";
            if (message.timeVal != null && message.hasOwnProperty("timeVal"))
                if (!$util.isString(message.timeVal))
                    return "timeVal: string expected";
            if (message.payload != null && message.hasOwnProperty("payload")) {
                if (!Array.isArray(message.payload))
                    return "payload: array expected";
                for (var i = 0; i < message.payload.length; ++i) {
                    var error = $root.google.protobuf.Any.verify(message.payload[i]);
                    if (error)
                        return "payload." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.Message)
                return object;
            var message = new $root.Message();
            switch (object.cmd) {
            case "NONE":
            case 0:
                message.cmd = 0;
                break;
            case "AUTH":
            case 1:
                message.cmd = 1;
                break;
            case "PINGREQ":
            case 2:
                message.cmd = 2;
                break;
            case "PONG":
            case 3:
                message.cmd = 3;
                break;
            case "SUBSCRIBE":
            case 4:
                message.cmd = 4;
                break;
            case "SUBACK":
            case 5:
                message.cmd = 5;
                break;
            case "UNSUBSCRIBE":
            case 6:
                message.cmd = 6;
                break;
            case "UNSUBACK":
            case 7:
                message.cmd = 7;
                break;
            case "PUSH":
            case 8:
                message.cmd = 8;
                break;
            case "AUTH_BACK":
            case 9:
                message.cmd = 9;
                break;
            }
            if (object.type != null)
                message.type = object.type | 0;
            if (object.commodityNo != null)
                message.commodityNo = String(object.commodityNo);
            if (object.contractNo != null)
                message.contractNo = String(object.contractNo);
            if (object.timeVal != null)
                message.timeVal = String(object.timeVal);
            if (object.payload) {
                if (!Array.isArray(object.payload))
                    throw TypeError(".Message.payload: array expected");
                message.payload = [];
                for (var i = 0; i < object.payload.length; ++i) {
                    if (typeof object.payload[i] !== "object")
                        throw TypeError(".Message.payload: object expected");
                    message.payload[i] = $root.google.protobuf.Any.fromObject(object.payload[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Message
         * @static
         * @param {Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.payload = [];
            if (options.defaults) {
                object.cmd = options.enums === String ? "NONE" : 0;
                object.type = 0;
                object.commodityNo = "";
                object.contractNo = "";
                object.timeVal = "";
            }
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                object.cmd = options.enums === String ? $root.Command[message.cmd] : message.cmd;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                object.commodityNo = message.commodityNo;
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                object.contractNo = message.contractNo;
            if (message.timeVal != null && message.hasOwnProperty("timeVal"))
                object.timeVal = message.timeVal;
            if (message.payload && message.payload.length) {
                object.payload = [];
                for (var j = 0; j < message.payload.length; ++j)
                    object.payload[j] = $root.google.protobuf.Any.toObject(message.payload[j], options);
            }
            return object;
        };
    
        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Message;
    })();
    
    $root.FuturesContractLineData = (function() {
    
        /**
         * Properties of a FuturesContractLineData.
         * @exports IFuturesContractLineData
         * @interface IFuturesContractLineData
         * @property {number|null} [scale] FuturesContractLineData scale
         * @property {string|null} [commodityNo] FuturesContractLineData commodityNo
         * @property {string|null} [contractNo] FuturesContractLineData contractNo
         * @property {number|Long|null} [timestamp] FuturesContractLineData timestamp
         * @property {string|null} [timeStr] FuturesContractLineData timeStr
         * @property {string|null} [openPrice] FuturesContractLineData openPrice
         * @property {string|null} [highPrice] FuturesContractLineData highPrice
         * @property {string|null} [lowPrice] FuturesContractLineData lowPrice
         * @property {string|null} [closePrice] FuturesContractLineData closePrice
         * @property {number|Long|null} [volume] FuturesContractLineData volume
         * @property {number|Long|null} [totalVolume] FuturesContractLineData totalVolume
         * @property {number|Long|null} [qTotalQty] FuturesContractLineData qTotalQty
         * @property {boolean|null} [isFull] FuturesContractLineData isFull
         * @property {number|null} [type] FuturesContractLineData type
         * @property {number|null} [timeVal] FuturesContractLineData timeVal
         * @property {string|null} [avgValue] FuturesContractLineData avgValue
         * @property {string|null} [startTime] FuturesContractLineData startTime
         * @property {string|null} [endTime] FuturesContractLineData endTime
         * @property {number|Long|null} [currentTime] FuturesContractLineData currentTime
         */
    
        /**
         * Constructs a new FuturesContractLineData.
         * @exports FuturesContractLineData
         * @classdesc Represents a FuturesContractLineData.
         * @implements IFuturesContractLineData
         * @constructor
         * @param {IFuturesContractLineData=} [properties] Properties to set
         */
        function FuturesContractLineData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * FuturesContractLineData scale.
         * @member {number} scale
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.scale = 0;
    
        /**
         * FuturesContractLineData commodityNo.
         * @member {string} commodityNo
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.commodityNo = "";
    
        /**
         * FuturesContractLineData contractNo.
         * @member {string} contractNo
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.contractNo = "";
    
        /**
         * FuturesContractLineData timestamp.
         * @member {number|Long} timestamp
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesContractLineData timeStr.
         * @member {string} timeStr
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.timeStr = "";
    
        /**
         * FuturesContractLineData openPrice.
         * @member {string} openPrice
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.openPrice = "";
    
        /**
         * FuturesContractLineData highPrice.
         * @member {string} highPrice
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.highPrice = "";
    
        /**
         * FuturesContractLineData lowPrice.
         * @member {string} lowPrice
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.lowPrice = "";
    
        /**
         * FuturesContractLineData closePrice.
         * @member {string} closePrice
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.closePrice = "";
    
        /**
         * FuturesContractLineData volume.
         * @member {number|Long} volume
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.volume = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesContractLineData totalVolume.
         * @member {number|Long} totalVolume
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.totalVolume = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesContractLineData qTotalQty.
         * @member {number|Long} qTotalQty
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.qTotalQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesContractLineData isFull.
         * @member {boolean} isFull
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.isFull = false;
    
        /**
         * FuturesContractLineData type.
         * @member {number} type
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.type = 0;
    
        /**
         * FuturesContractLineData timeVal.
         * @member {number} timeVal
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.timeVal = 0;
    
        /**
         * FuturesContractLineData avgValue.
         * @member {string} avgValue
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.avgValue = "";
    
        /**
         * FuturesContractLineData startTime.
         * @member {string} startTime
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.startTime = "";
    
        /**
         * FuturesContractLineData endTime.
         * @member {string} endTime
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.endTime = "";
    
        /**
         * FuturesContractLineData currentTime.
         * @member {number|Long} currentTime
         * @memberof FuturesContractLineData
         * @instance
         */
        FuturesContractLineData.prototype.currentTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Creates a new FuturesContractLineData instance using the specified properties.
         * @function create
         * @memberof FuturesContractLineData
         * @static
         * @param {IFuturesContractLineData=} [properties] Properties to set
         * @returns {FuturesContractLineData} FuturesContractLineData instance
         */
        FuturesContractLineData.create = function create(properties) {
            return new FuturesContractLineData(properties);
        };
    
        /**
         * Encodes the specified FuturesContractLineData message. Does not implicitly {@link FuturesContractLineData.verify|verify} messages.
         * @function encode
         * @memberof FuturesContractLineData
         * @static
         * @param {IFuturesContractLineData} message FuturesContractLineData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesContractLineData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.scale != null && message.hasOwnProperty("scale"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.scale);
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.commodityNo);
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.contractNo);
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
            if (message.timeStr != null && message.hasOwnProperty("timeStr"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.timeStr);
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.openPrice);
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.highPrice);
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.lowPrice);
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.closePrice);
            if (message.volume != null && message.hasOwnProperty("volume"))
                writer.uint32(/* id 10, wireType 0 =*/80).sint64(message.volume);
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                writer.uint32(/* id 11, wireType 0 =*/88).sint64(message.totalVolume);
            if (message.isFull != null && message.hasOwnProperty("isFull"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.isFull);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.type);
            if (message.timeVal != null && message.hasOwnProperty("timeVal"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.timeVal);
            if (message.qTotalQty != null && message.hasOwnProperty("qTotalQty"))
                writer.uint32(/* id 15, wireType 0 =*/120).int64(message.qTotalQty);
            if (message.avgValue != null && message.hasOwnProperty("avgValue"))
                writer.uint32(/* id 16, wireType 2 =*/130).string(message.avgValue);
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                writer.uint32(/* id 17, wireType 2 =*/138).string(message.startTime);
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.endTime);
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                writer.uint32(/* id 19, wireType 0 =*/152).int64(message.currentTime);
            return writer;
        };
    
        /**
         * Encodes the specified FuturesContractLineData message, length delimited. Does not implicitly {@link FuturesContractLineData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof FuturesContractLineData
         * @static
         * @param {IFuturesContractLineData} message FuturesContractLineData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesContractLineData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a FuturesContractLineData message from the specified reader or buffer.
         * @function decode
         * @memberof FuturesContractLineData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FuturesContractLineData} FuturesContractLineData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesContractLineData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FuturesContractLineData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.scale = reader.int32();
                    break;
                case 2:
                    message.commodityNo = reader.string();
                    break;
                case 3:
                    message.contractNo = reader.string();
                    break;
                case 4:
                    message.timestamp = reader.int64();
                    break;
                case 5:
                    message.timeStr = reader.string();
                    break;
                case 6:
                    message.openPrice = reader.string();
                    break;
                case 7:
                    message.highPrice = reader.string();
                    break;
                case 8:
                    message.lowPrice = reader.string();
                    break;
                case 9:
                    message.closePrice = reader.string();
                    break;
                case 10:
                    message.volume = reader.sint64();
                    break;
                case 11:
                    message.totalVolume = reader.sint64();
                    break;
                case 15:
                    message.qTotalQty = reader.int64();
                    break;
                case 12:
                    message.isFull = reader.bool();
                    break;
                case 13:
                    message.type = reader.int32();
                    break;
                case 14:
                    message.timeVal = reader.int32();
                    break;
                case 16:
                    message.avgValue = reader.string();
                    break;
                case 17:
                    message.startTime = reader.string();
                    break;
                case 18:
                    message.endTime = reader.string();
                    break;
                case 19:
                    message.currentTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a FuturesContractLineData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof FuturesContractLineData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {FuturesContractLineData} FuturesContractLineData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesContractLineData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a FuturesContractLineData message.
         * @function verify
         * @memberof FuturesContractLineData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FuturesContractLineData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.scale != null && message.hasOwnProperty("scale"))
                if (!$util.isInteger(message.scale))
                    return "scale: integer expected";
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                if (!$util.isString(message.commodityNo))
                    return "commodityNo: string expected";
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                if (!$util.isString(message.contractNo))
                    return "contractNo: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.timeStr != null && message.hasOwnProperty("timeStr"))
                if (!$util.isString(message.timeStr))
                    return "timeStr: string expected";
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                if (!$util.isString(message.openPrice))
                    return "openPrice: string expected";
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                if (!$util.isString(message.highPrice))
                    return "highPrice: string expected";
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                if (!$util.isString(message.lowPrice))
                    return "lowPrice: string expected";
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                if (!$util.isString(message.closePrice))
                    return "closePrice: string expected";
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (!$util.isInteger(message.volume) && !(message.volume && $util.isInteger(message.volume.low) && $util.isInteger(message.volume.high)))
                    return "volume: integer|Long expected";
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                if (!$util.isInteger(message.totalVolume) && !(message.totalVolume && $util.isInteger(message.totalVolume.low) && $util.isInteger(message.totalVolume.high)))
                    return "totalVolume: integer|Long expected";
            if (message.qTotalQty != null && message.hasOwnProperty("qTotalQty"))
                if (!$util.isInteger(message.qTotalQty) && !(message.qTotalQty && $util.isInteger(message.qTotalQty.low) && $util.isInteger(message.qTotalQty.high)))
                    return "qTotalQty: integer|Long expected";
            if (message.isFull != null && message.hasOwnProperty("isFull"))
                if (typeof message.isFull !== "boolean")
                    return "isFull: boolean expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.timeVal != null && message.hasOwnProperty("timeVal"))
                if (!$util.isInteger(message.timeVal))
                    return "timeVal: integer expected";
            if (message.avgValue != null && message.hasOwnProperty("avgValue"))
                if (!$util.isString(message.avgValue))
                    return "avgValue: string expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isString(message.startTime))
                    return "startTime: string expected";
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (!$util.isString(message.endTime))
                    return "endTime: string expected";
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (!$util.isInteger(message.currentTime) && !(message.currentTime && $util.isInteger(message.currentTime.low) && $util.isInteger(message.currentTime.high)))
                    return "currentTime: integer|Long expected";
            return null;
        };
    
        /**
         * Creates a FuturesContractLineData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof FuturesContractLineData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {FuturesContractLineData} FuturesContractLineData
         */
        FuturesContractLineData.fromObject = function fromObject(object) {
            if (object instanceof $root.FuturesContractLineData)
                return object;
            var message = new $root.FuturesContractLineData();
            if (object.scale != null)
                message.scale = object.scale | 0;
            if (object.commodityNo != null)
                message.commodityNo = String(object.commodityNo);
            if (object.contractNo != null)
                message.contractNo = String(object.contractNo);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.timeStr != null)
                message.timeStr = String(object.timeStr);
            if (object.openPrice != null)
                message.openPrice = String(object.openPrice);
            if (object.highPrice != null)
                message.highPrice = String(object.highPrice);
            if (object.lowPrice != null)
                message.lowPrice = String(object.lowPrice);
            if (object.closePrice != null)
                message.closePrice = String(object.closePrice);
            if (object.volume != null)
                if ($util.Long)
                    (message.volume = $util.Long.fromValue(object.volume)).unsigned = false;
                else if (typeof object.volume === "string")
                    message.volume = parseInt(object.volume, 10);
                else if (typeof object.volume === "number")
                    message.volume = object.volume;
                else if (typeof object.volume === "object")
                    message.volume = new $util.LongBits(object.volume.low >>> 0, object.volume.high >>> 0).toNumber();
            if (object.totalVolume != null)
                if ($util.Long)
                    (message.totalVolume = $util.Long.fromValue(object.totalVolume)).unsigned = false;
                else if (typeof object.totalVolume === "string")
                    message.totalVolume = parseInt(object.totalVolume, 10);
                else if (typeof object.totalVolume === "number")
                    message.totalVolume = object.totalVolume;
                else if (typeof object.totalVolume === "object")
                    message.totalVolume = new $util.LongBits(object.totalVolume.low >>> 0, object.totalVolume.high >>> 0).toNumber();
            if (object.qTotalQty != null)
                if ($util.Long)
                    (message.qTotalQty = $util.Long.fromValue(object.qTotalQty)).unsigned = false;
                else if (typeof object.qTotalQty === "string")
                    message.qTotalQty = parseInt(object.qTotalQty, 10);
                else if (typeof object.qTotalQty === "number")
                    message.qTotalQty = object.qTotalQty;
                else if (typeof object.qTotalQty === "object")
                    message.qTotalQty = new $util.LongBits(object.qTotalQty.low >>> 0, object.qTotalQty.high >>> 0).toNumber();
            if (object.isFull != null)
                message.isFull = Boolean(object.isFull);
            if (object.type != null)
                message.type = object.type | 0;
            if (object.timeVal != null)
                message.timeVal = object.timeVal | 0;
            if (object.avgValue != null)
                message.avgValue = String(object.avgValue);
            if (object.startTime != null)
                message.startTime = String(object.startTime);
            if (object.endTime != null)
                message.endTime = String(object.endTime);
            if (object.currentTime != null)
                if ($util.Long)
                    (message.currentTime = $util.Long.fromValue(object.currentTime)).unsigned = false;
                else if (typeof object.currentTime === "string")
                    message.currentTime = parseInt(object.currentTime, 10);
                else if (typeof object.currentTime === "number")
                    message.currentTime = object.currentTime;
                else if (typeof object.currentTime === "object")
                    message.currentTime = new $util.LongBits(object.currentTime.low >>> 0, object.currentTime.high >>> 0).toNumber();
            return message;
        };
    
        /**
         * Creates a plain object from a FuturesContractLineData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof FuturesContractLineData
         * @static
         * @param {FuturesContractLineData} message FuturesContractLineData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FuturesContractLineData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.scale = 0;
                object.commodityNo = "";
                object.contractNo = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.timeStr = "";
                object.openPrice = "";
                object.highPrice = "";
                object.lowPrice = "";
                object.closePrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.volume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.volume = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.totalVolume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.totalVolume = options.longs === String ? "0" : 0;
                object.isFull = false;
                object.type = 0;
                object.timeVal = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.qTotalQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.qTotalQty = options.longs === String ? "0" : 0;
                object.avgValue = "";
                object.startTime = "";
                object.endTime = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.currentTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.currentTime = options.longs === String ? "0" : 0;
            }
            if (message.scale != null && message.hasOwnProperty("scale"))
                object.scale = message.scale;
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                object.commodityNo = message.commodityNo;
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                object.contractNo = message.contractNo;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.timeStr != null && message.hasOwnProperty("timeStr"))
                object.timeStr = message.timeStr;
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                object.openPrice = message.openPrice;
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                object.highPrice = message.highPrice;
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                object.lowPrice = message.lowPrice;
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                object.closePrice = message.closePrice;
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (typeof message.volume === "number")
                    object.volume = options.longs === String ? String(message.volume) : message.volume;
                else
                    object.volume = options.longs === String ? $util.Long.prototype.toString.call(message.volume) : options.longs === Number ? new $util.LongBits(message.volume.low >>> 0, message.volume.high >>> 0).toNumber() : message.volume;
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                if (typeof message.totalVolume === "number")
                    object.totalVolume = options.longs === String ? String(message.totalVolume) : message.totalVolume;
                else
                    object.totalVolume = options.longs === String ? $util.Long.prototype.toString.call(message.totalVolume) : options.longs === Number ? new $util.LongBits(message.totalVolume.low >>> 0, message.totalVolume.high >>> 0).toNumber() : message.totalVolume;
            if (message.isFull != null && message.hasOwnProperty("isFull"))
                object.isFull = message.isFull;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.timeVal != null && message.hasOwnProperty("timeVal"))
                object.timeVal = message.timeVal;
            if (message.qTotalQty != null && message.hasOwnProperty("qTotalQty"))
                if (typeof message.qTotalQty === "number")
                    object.qTotalQty = options.longs === String ? String(message.qTotalQty) : message.qTotalQty;
                else
                    object.qTotalQty = options.longs === String ? $util.Long.prototype.toString.call(message.qTotalQty) : options.longs === Number ? new $util.LongBits(message.qTotalQty.low >>> 0, message.qTotalQty.high >>> 0).toNumber() : message.qTotalQty;
            if (message.avgValue != null && message.hasOwnProperty("avgValue"))
                object.avgValue = message.avgValue;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                object.startTime = message.startTime;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                object.endTime = message.endTime;
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (typeof message.currentTime === "number")
                    object.currentTime = options.longs === String ? String(message.currentTime) : message.currentTime;
                else
                    object.currentTime = options.longs === String ? $util.Long.prototype.toString.call(message.currentTime) : options.longs === Number ? new $util.LongBits(message.currentTime.low >>> 0, message.currentTime.high >>> 0).toNumber() : message.currentTime;
            return object;
        };
    
        /**
         * Converts this FuturesContractLineData to JSON.
         * @function toJSON
         * @memberof FuturesContractLineData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FuturesContractLineData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return FuturesContractLineData;
    })();
    
    $root.FuturesQuoteSimpleDataBase = (function() {
    
        /**
         * Properties of a FuturesQuoteSimpleDataBase.
         * @exports IFuturesQuoteSimpleDataBase
         * @interface IFuturesQuoteSimpleDataBase
         * @property {string|null} [time] FuturesQuoteSimpleDataBase time
         * @property {string|null} [commodityNo] FuturesQuoteSimpleDataBase commodityNo
         * @property {string|null} [contractNo] FuturesQuoteSimpleDataBase contractNo
         * @property {string|null} [lastPrice] FuturesQuoteSimpleDataBase lastPrice
         * @property {string|null} [openPrice] FuturesQuoteSimpleDataBase openPrice
         * @property {string|null} [highPrice] FuturesQuoteSimpleDataBase highPrice
         * @property {string|null} [lowPrice] FuturesQuoteSimpleDataBase lowPrice
         * @property {string|null} [closePrice] FuturesQuoteSimpleDataBase closePrice
         * @property {string|null} [bidPrice] FuturesQuoteSimpleDataBase bidPrice
         * @property {number|Long|null} [bidSize] FuturesQuoteSimpleDataBase bidSize
         * @property {string|null} [askPrice] FuturesQuoteSimpleDataBase askPrice
         * @property {number|Long|null} [askSize] FuturesQuoteSimpleDataBase askSize
         * @property {string|null} [nowClosePrice] FuturesQuoteSimpleDataBase nowClosePrice
         * @property {string|null} [preSettlePrice] FuturesQuoteSimpleDataBase preSettlePrice
         * @property {number|Long|null} [totalQty] FuturesQuoteSimpleDataBase totalQty
         * @property {number|Long|null} [positionQty] FuturesQuoteSimpleDataBase positionQty
         * @property {number|Long|null} [prePositionQty] FuturesQuoteSimpleDataBase prePositionQty
         * @property {number|Long|null} [currentTime] FuturesQuoteSimpleDataBase currentTime
         */
    
        /**
         * Constructs a new FuturesQuoteSimpleDataBase.
         * @exports FuturesQuoteSimpleDataBase
         * @classdesc Represents a FuturesQuoteSimpleDataBase.
         * @implements IFuturesQuoteSimpleDataBase
         * @constructor
         * @param {IFuturesQuoteSimpleDataBase=} [properties] Properties to set
         */
        function FuturesQuoteSimpleDataBase(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * FuturesQuoteSimpleDataBase time.
         * @member {string} time
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.time = "";
    
        /**
         * FuturesQuoteSimpleDataBase commodityNo.
         * @member {string} commodityNo
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.commodityNo = "";
    
        /**
         * FuturesQuoteSimpleDataBase contractNo.
         * @member {string} contractNo
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.contractNo = "";
    
        /**
         * FuturesQuoteSimpleDataBase lastPrice.
         * @member {string} lastPrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.lastPrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase openPrice.
         * @member {string} openPrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.openPrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase highPrice.
         * @member {string} highPrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.highPrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase lowPrice.
         * @member {string} lowPrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.lowPrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase closePrice.
         * @member {string} closePrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.closePrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase bidPrice.
         * @member {string} bidPrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.bidPrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase bidSize.
         * @member {number|Long} bidSize
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.bidSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteSimpleDataBase askPrice.
         * @member {string} askPrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.askPrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase askSize.
         * @member {number|Long} askSize
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.askSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteSimpleDataBase nowClosePrice.
         * @member {string} nowClosePrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.nowClosePrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase preSettlePrice.
         * @member {string} preSettlePrice
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.preSettlePrice = "";
    
        /**
         * FuturesQuoteSimpleDataBase totalQty.
         * @member {number|Long} totalQty
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.totalQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteSimpleDataBase positionQty.
         * @member {number|Long} positionQty
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.positionQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteSimpleDataBase prePositionQty.
         * @member {number|Long} prePositionQty
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.prePositionQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteSimpleDataBase currentTime.
         * @member {number|Long} currentTime
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         */
        FuturesQuoteSimpleDataBase.prototype.currentTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Creates a new FuturesQuoteSimpleDataBase instance using the specified properties.
         * @function create
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {IFuturesQuoteSimpleDataBase=} [properties] Properties to set
         * @returns {FuturesQuoteSimpleDataBase} FuturesQuoteSimpleDataBase instance
         */
        FuturesQuoteSimpleDataBase.create = function create(properties) {
            return new FuturesQuoteSimpleDataBase(properties);
        };
    
        /**
         * Encodes the specified FuturesQuoteSimpleDataBase message. Does not implicitly {@link FuturesQuoteSimpleDataBase.verify|verify} messages.
         * @function encode
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {IFuturesQuoteSimpleDataBase} message FuturesQuoteSimpleDataBase message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesQuoteSimpleDataBase.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.time);
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.commodityNo);
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.contractNo);
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.lastPrice);
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.openPrice);
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.highPrice);
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.lowPrice);
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.closePrice);
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.bidPrice);
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.bidSize);
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.askPrice);
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                writer.uint32(/* id 12, wireType 0 =*/96).int64(message.askSize);
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.nowClosePrice);
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.preSettlePrice);
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                writer.uint32(/* id 15, wireType 0 =*/120).int64(message.totalQty);
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                writer.uint32(/* id 16, wireType 0 =*/128).int64(message.positionQty);
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                writer.uint32(/* id 17, wireType 0 =*/136).int64(message.prePositionQty);
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                writer.uint32(/* id 18, wireType 0 =*/144).int64(message.currentTime);
            return writer;
        };
    
        /**
         * Encodes the specified FuturesQuoteSimpleDataBase message, length delimited. Does not implicitly {@link FuturesQuoteSimpleDataBase.verify|verify} messages.
         * @function encodeDelimited
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {IFuturesQuoteSimpleDataBase} message FuturesQuoteSimpleDataBase message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesQuoteSimpleDataBase.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a FuturesQuoteSimpleDataBase message from the specified reader or buffer.
         * @function decode
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FuturesQuoteSimpleDataBase} FuturesQuoteSimpleDataBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesQuoteSimpleDataBase.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FuturesQuoteSimpleDataBase();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.string();
                    break;
                case 2:
                    message.commodityNo = reader.string();
                    break;
                case 3:
                    message.contractNo = reader.string();
                    break;
                case 4:
                    message.lastPrice = reader.string();
                    break;
                case 5:
                    message.openPrice = reader.string();
                    break;
                case 6:
                    message.highPrice = reader.string();
                    break;
                case 7:
                    message.lowPrice = reader.string();
                    break;
                case 8:
                    message.closePrice = reader.string();
                    break;
                case 9:
                    message.bidPrice = reader.string();
                    break;
                case 10:
                    message.bidSize = reader.int64();
                    break;
                case 11:
                    message.askPrice = reader.string();
                    break;
                case 12:
                    message.askSize = reader.int64();
                    break;
                case 13:
                    message.nowClosePrice = reader.string();
                    break;
                case 14:
                    message.preSettlePrice = reader.string();
                    break;
                case 15:
                    message.totalQty = reader.int64();
                    break;
                case 16:
                    message.positionQty = reader.int64();
                    break;
                case 17:
                    message.prePositionQty = reader.int64();
                    break;
                case 18:
                    message.currentTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a FuturesQuoteSimpleDataBase message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {FuturesQuoteSimpleDataBase} FuturesQuoteSimpleDataBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesQuoteSimpleDataBase.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a FuturesQuoteSimpleDataBase message.
         * @function verify
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FuturesQuoteSimpleDataBase.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isString(message.time))
                    return "time: string expected";
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                if (!$util.isString(message.commodityNo))
                    return "commodityNo: string expected";
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                if (!$util.isString(message.contractNo))
                    return "contractNo: string expected";
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                if (!$util.isString(message.lastPrice))
                    return "lastPrice: string expected";
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                if (!$util.isString(message.openPrice))
                    return "openPrice: string expected";
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                if (!$util.isString(message.highPrice))
                    return "highPrice: string expected";
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                if (!$util.isString(message.lowPrice))
                    return "lowPrice: string expected";
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                if (!$util.isString(message.closePrice))
                    return "closePrice: string expected";
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                if (!$util.isString(message.bidPrice))
                    return "bidPrice: string expected";
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                if (!$util.isInteger(message.bidSize) && !(message.bidSize && $util.isInteger(message.bidSize.low) && $util.isInteger(message.bidSize.high)))
                    return "bidSize: integer|Long expected";
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                if (!$util.isString(message.askPrice))
                    return "askPrice: string expected";
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                if (!$util.isInteger(message.askSize) && !(message.askSize && $util.isInteger(message.askSize.low) && $util.isInteger(message.askSize.high)))
                    return "askSize: integer|Long expected";
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                if (!$util.isString(message.nowClosePrice))
                    return "nowClosePrice: string expected";
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                if (!$util.isString(message.preSettlePrice))
                    return "preSettlePrice: string expected";
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                if (!$util.isInteger(message.totalQty) && !(message.totalQty && $util.isInteger(message.totalQty.low) && $util.isInteger(message.totalQty.high)))
                    return "totalQty: integer|Long expected";
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                if (!$util.isInteger(message.positionQty) && !(message.positionQty && $util.isInteger(message.positionQty.low) && $util.isInteger(message.positionQty.high)))
                    return "positionQty: integer|Long expected";
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                if (!$util.isInteger(message.prePositionQty) && !(message.prePositionQty && $util.isInteger(message.prePositionQty.low) && $util.isInteger(message.prePositionQty.high)))
                    return "prePositionQty: integer|Long expected";
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (!$util.isInteger(message.currentTime) && !(message.currentTime && $util.isInteger(message.currentTime.low) && $util.isInteger(message.currentTime.high)))
                    return "currentTime: integer|Long expected";
            return null;
        };
    
        /**
         * Creates a FuturesQuoteSimpleDataBase message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {FuturesQuoteSimpleDataBase} FuturesQuoteSimpleDataBase
         */
        FuturesQuoteSimpleDataBase.fromObject = function fromObject(object) {
            if (object instanceof $root.FuturesQuoteSimpleDataBase)
                return object;
            var message = new $root.FuturesQuoteSimpleDataBase();
            if (object.time != null)
                message.time = String(object.time);
            if (object.commodityNo != null)
                message.commodityNo = String(object.commodityNo);
            if (object.contractNo != null)
                message.contractNo = String(object.contractNo);
            if (object.lastPrice != null)
                message.lastPrice = String(object.lastPrice);
            if (object.openPrice != null)
                message.openPrice = String(object.openPrice);
            if (object.highPrice != null)
                message.highPrice = String(object.highPrice);
            if (object.lowPrice != null)
                message.lowPrice = String(object.lowPrice);
            if (object.closePrice != null)
                message.closePrice = String(object.closePrice);
            if (object.bidPrice != null)
                message.bidPrice = String(object.bidPrice);
            if (object.bidSize != null)
                if ($util.Long)
                    (message.bidSize = $util.Long.fromValue(object.bidSize)).unsigned = false;
                else if (typeof object.bidSize === "string")
                    message.bidSize = parseInt(object.bidSize, 10);
                else if (typeof object.bidSize === "number")
                    message.bidSize = object.bidSize;
                else if (typeof object.bidSize === "object")
                    message.bidSize = new $util.LongBits(object.bidSize.low >>> 0, object.bidSize.high >>> 0).toNumber();
            if (object.askPrice != null)
                message.askPrice = String(object.askPrice);
            if (object.askSize != null)
                if ($util.Long)
                    (message.askSize = $util.Long.fromValue(object.askSize)).unsigned = false;
                else if (typeof object.askSize === "string")
                    message.askSize = parseInt(object.askSize, 10);
                else if (typeof object.askSize === "number")
                    message.askSize = object.askSize;
                else if (typeof object.askSize === "object")
                    message.askSize = new $util.LongBits(object.askSize.low >>> 0, object.askSize.high >>> 0).toNumber();
            if (object.nowClosePrice != null)
                message.nowClosePrice = String(object.nowClosePrice);
            if (object.preSettlePrice != null)
                message.preSettlePrice = String(object.preSettlePrice);
            if (object.totalQty != null)
                if ($util.Long)
                    (message.totalQty = $util.Long.fromValue(object.totalQty)).unsigned = false;
                else if (typeof object.totalQty === "string")
                    message.totalQty = parseInt(object.totalQty, 10);
                else if (typeof object.totalQty === "number")
                    message.totalQty = object.totalQty;
                else if (typeof object.totalQty === "object")
                    message.totalQty = new $util.LongBits(object.totalQty.low >>> 0, object.totalQty.high >>> 0).toNumber();
            if (object.positionQty != null)
                if ($util.Long)
                    (message.positionQty = $util.Long.fromValue(object.positionQty)).unsigned = false;
                else if (typeof object.positionQty === "string")
                    message.positionQty = parseInt(object.positionQty, 10);
                else if (typeof object.positionQty === "number")
                    message.positionQty = object.positionQty;
                else if (typeof object.positionQty === "object")
                    message.positionQty = new $util.LongBits(object.positionQty.low >>> 0, object.positionQty.high >>> 0).toNumber();
            if (object.prePositionQty != null)
                if ($util.Long)
                    (message.prePositionQty = $util.Long.fromValue(object.prePositionQty)).unsigned = false;
                else if (typeof object.prePositionQty === "string")
                    message.prePositionQty = parseInt(object.prePositionQty, 10);
                else if (typeof object.prePositionQty === "number")
                    message.prePositionQty = object.prePositionQty;
                else if (typeof object.prePositionQty === "object")
                    message.prePositionQty = new $util.LongBits(object.prePositionQty.low >>> 0, object.prePositionQty.high >>> 0).toNumber();
            if (object.currentTime != null)
                if ($util.Long)
                    (message.currentTime = $util.Long.fromValue(object.currentTime)).unsigned = false;
                else if (typeof object.currentTime === "string")
                    message.currentTime = parseInt(object.currentTime, 10);
                else if (typeof object.currentTime === "number")
                    message.currentTime = object.currentTime;
                else if (typeof object.currentTime === "object")
                    message.currentTime = new $util.LongBits(object.currentTime.low >>> 0, object.currentTime.high >>> 0).toNumber();
            return message;
        };
    
        /**
         * Creates a plain object from a FuturesQuoteSimpleDataBase message. Also converts values to other types if specified.
         * @function toObject
         * @memberof FuturesQuoteSimpleDataBase
         * @static
         * @param {FuturesQuoteSimpleDataBase} message FuturesQuoteSimpleDataBase
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FuturesQuoteSimpleDataBase.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.time = "";
                object.commodityNo = "";
                object.contractNo = "";
                object.lastPrice = "";
                object.openPrice = "";
                object.highPrice = "";
                object.lowPrice = "";
                object.closePrice = "";
                object.bidPrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize = options.longs === String ? "0" : 0;
                object.askPrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize = options.longs === String ? "0" : 0;
                object.nowClosePrice = "";
                object.preSettlePrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.totalQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.totalQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.positionQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.positionQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.prePositionQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.prePositionQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.currentTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.currentTime = options.longs === String ? "0" : 0;
            }
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                object.commodityNo = message.commodityNo;
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                object.contractNo = message.contractNo;
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                object.lastPrice = message.lastPrice;
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                object.openPrice = message.openPrice;
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                object.highPrice = message.highPrice;
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                object.lowPrice = message.lowPrice;
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                object.closePrice = message.closePrice;
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                object.bidPrice = message.bidPrice;
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                if (typeof message.bidSize === "number")
                    object.bidSize = options.longs === String ? String(message.bidSize) : message.bidSize;
                else
                    object.bidSize = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize) : options.longs === Number ? new $util.LongBits(message.bidSize.low >>> 0, message.bidSize.high >>> 0).toNumber() : message.bidSize;
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                object.askPrice = message.askPrice;
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                if (typeof message.askSize === "number")
                    object.askSize = options.longs === String ? String(message.askSize) : message.askSize;
                else
                    object.askSize = options.longs === String ? $util.Long.prototype.toString.call(message.askSize) : options.longs === Number ? new $util.LongBits(message.askSize.low >>> 0, message.askSize.high >>> 0).toNumber() : message.askSize;
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                object.nowClosePrice = message.nowClosePrice;
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                object.preSettlePrice = message.preSettlePrice;
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                if (typeof message.totalQty === "number")
                    object.totalQty = options.longs === String ? String(message.totalQty) : message.totalQty;
                else
                    object.totalQty = options.longs === String ? $util.Long.prototype.toString.call(message.totalQty) : options.longs === Number ? new $util.LongBits(message.totalQty.low >>> 0, message.totalQty.high >>> 0).toNumber() : message.totalQty;
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                if (typeof message.positionQty === "number")
                    object.positionQty = options.longs === String ? String(message.positionQty) : message.positionQty;
                else
                    object.positionQty = options.longs === String ? $util.Long.prototype.toString.call(message.positionQty) : options.longs === Number ? new $util.LongBits(message.positionQty.low >>> 0, message.positionQty.high >>> 0).toNumber() : message.positionQty;
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                if (typeof message.prePositionQty === "number")
                    object.prePositionQty = options.longs === String ? String(message.prePositionQty) : message.prePositionQty;
                else
                    object.prePositionQty = options.longs === String ? $util.Long.prototype.toString.call(message.prePositionQty) : options.longs === Number ? new $util.LongBits(message.prePositionQty.low >>> 0, message.prePositionQty.high >>> 0).toNumber() : message.prePositionQty;
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (typeof message.currentTime === "number")
                    object.currentTime = options.longs === String ? String(message.currentTime) : message.currentTime;
                else
                    object.currentTime = options.longs === String ? $util.Long.prototype.toString.call(message.currentTime) : options.longs === Number ? new $util.LongBits(message.currentTime.low >>> 0, message.currentTime.high >>> 0).toNumber() : message.currentTime;
            return object;
        };
    
        /**
         * Converts this FuturesQuoteSimpleDataBase to JSON.
         * @function toJSON
         * @memberof FuturesQuoteSimpleDataBase
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FuturesQuoteSimpleDataBase.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return FuturesQuoteSimpleDataBase;
    })();
    
    $root.FuturesQuoteDataBase = (function() {
    
        /**
         * Properties of a FuturesQuoteDataBase.
         * @exports IFuturesQuoteDataBase
         * @interface IFuturesQuoteDataBase
         * @property {string|null} [time] FuturesQuoteDataBase time
         * @property {string|null} [commodityNo] FuturesQuoteDataBase commodityNo
         * @property {string|null} [contractNo] FuturesQuoteDataBase contractNo
         * @property {string|null} [bidPrice] FuturesQuoteDataBase bidPrice
         * @property {string|null} [bidPrice2] FuturesQuoteDataBase bidPrice2
         * @property {string|null} [bidPrice3] FuturesQuoteDataBase bidPrice3
         * @property {string|null} [bidPrice4] FuturesQuoteDataBase bidPrice4
         * @property {string|null} [bidPrice5] FuturesQuoteDataBase bidPrice5
         * @property {number|Long|null} [bidSize] FuturesQuoteDataBase bidSize
         * @property {number|Long|null} [bidSize2] FuturesQuoteDataBase bidSize2
         * @property {number|Long|null} [bidSize3] FuturesQuoteDataBase bidSize3
         * @property {number|Long|null} [bidSize4] FuturesQuoteDataBase bidSize4
         * @property {number|Long|null} [bidSize5] FuturesQuoteDataBase bidSize5
         * @property {string|null} [askPrice] FuturesQuoteDataBase askPrice
         * @property {string|null} [askPrice2] FuturesQuoteDataBase askPrice2
         * @property {string|null} [askPrice3] FuturesQuoteDataBase askPrice3
         * @property {string|null} [askPrice4] FuturesQuoteDataBase askPrice4
         * @property {string|null} [askPrice5] FuturesQuoteDataBase askPrice5
         * @property {number|Long|null} [askSize] FuturesQuoteDataBase askSize
         * @property {number|Long|null} [askSize2] FuturesQuoteDataBase askSize2
         * @property {number|Long|null} [askSize3] FuturesQuoteDataBase askSize3
         * @property {number|Long|null} [askSize4] FuturesQuoteDataBase askSize4
         * @property {number|Long|null} [askSize5] FuturesQuoteDataBase askSize5
         * @property {string|null} [lastPrice] FuturesQuoteDataBase lastPrice
         * @property {number|Long|null} [lastSize] FuturesQuoteDataBase lastSize
         * @property {string|null} [openPrice] FuturesQuoteDataBase openPrice
         * @property {string|null} [highPrice] FuturesQuoteDataBase highPrice
         * @property {string|null} [lowPrice] FuturesQuoteDataBase lowPrice
         * @property {string|null} [closePrice] FuturesQuoteDataBase closePrice
         * @property {number|Long|null} [volume] FuturesQuoteDataBase volume
         * @property {number|Long|null} [totalVolume] FuturesQuoteDataBase totalVolume
         * @property {string|null} [nowClosePrice] FuturesQuoteDataBase nowClosePrice
         * @property {string|null} [preSettlePrice] FuturesQuoteDataBase preSettlePrice
         * @property {number|Long|null} [totalQty] FuturesQuoteDataBase totalQty
         * @property {number|Long|null} [positionQty] FuturesQuoteDataBase positionQty
         * @property {number|Long|null} [prePositionQty] FuturesQuoteDataBase prePositionQty
         * @property {number|Long|null} [currentTime] FuturesQuoteDataBase currentTime
         */
    
        /**
         * Constructs a new FuturesQuoteDataBase.
         * @exports FuturesQuoteDataBase
         * @classdesc Represents a FuturesQuoteDataBase.
         * @implements IFuturesQuoteDataBase
         * @constructor
         * @param {IFuturesQuoteDataBase=} [properties] Properties to set
         */
        function FuturesQuoteDataBase(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * FuturesQuoteDataBase time.
         * @member {string} time
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.time = "";
    
        /**
         * FuturesQuoteDataBase commodityNo.
         * @member {string} commodityNo
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.commodityNo = "";
    
        /**
         * FuturesQuoteDataBase contractNo.
         * @member {string} contractNo
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.contractNo = "";
    
        /**
         * FuturesQuoteDataBase bidPrice.
         * @member {string} bidPrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidPrice = "";
    
        /**
         * FuturesQuoteDataBase bidPrice2.
         * @member {string} bidPrice2
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidPrice2 = "";
    
        /**
         * FuturesQuoteDataBase bidPrice3.
         * @member {string} bidPrice3
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidPrice3 = "";
    
        /**
         * FuturesQuoteDataBase bidPrice4.
         * @member {string} bidPrice4
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidPrice4 = "";
    
        /**
         * FuturesQuoteDataBase bidPrice5.
         * @member {string} bidPrice5
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidPrice5 = "";
    
        /**
         * FuturesQuoteDataBase bidSize.
         * @member {number|Long} bidSize
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase bidSize2.
         * @member {number|Long} bidSize2
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidSize2 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase bidSize3.
         * @member {number|Long} bidSize3
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidSize3 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase bidSize4.
         * @member {number|Long} bidSize4
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidSize4 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase bidSize5.
         * @member {number|Long} bidSize5
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.bidSize5 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase askPrice.
         * @member {string} askPrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askPrice = "";
    
        /**
         * FuturesQuoteDataBase askPrice2.
         * @member {string} askPrice2
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askPrice2 = "";
    
        /**
         * FuturesQuoteDataBase askPrice3.
         * @member {string} askPrice3
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askPrice3 = "";
    
        /**
         * FuturesQuoteDataBase askPrice4.
         * @member {string} askPrice4
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askPrice4 = "";
    
        /**
         * FuturesQuoteDataBase askPrice5.
         * @member {string} askPrice5
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askPrice5 = "";
    
        /**
         * FuturesQuoteDataBase askSize.
         * @member {number|Long} askSize
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase askSize2.
         * @member {number|Long} askSize2
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askSize2 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase askSize3.
         * @member {number|Long} askSize3
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askSize3 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase askSize4.
         * @member {number|Long} askSize4
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askSize4 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase askSize5.
         * @member {number|Long} askSize5
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.askSize5 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase lastPrice.
         * @member {string} lastPrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.lastPrice = "";
    
        /**
         * FuturesQuoteDataBase lastSize.
         * @member {number|Long} lastSize
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.lastSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase openPrice.
         * @member {string} openPrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.openPrice = "";
    
        /**
         * FuturesQuoteDataBase highPrice.
         * @member {string} highPrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.highPrice = "";
    
        /**
         * FuturesQuoteDataBase lowPrice.
         * @member {string} lowPrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.lowPrice = "";
    
        /**
         * FuturesQuoteDataBase closePrice.
         * @member {string} closePrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.closePrice = "";
    
        /**
         * FuturesQuoteDataBase volume.
         * @member {number|Long} volume
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.volume = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase totalVolume.
         * @member {number|Long} totalVolume
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.totalVolume = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase nowClosePrice.
         * @member {string} nowClosePrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.nowClosePrice = "";
    
        /**
         * FuturesQuoteDataBase preSettlePrice.
         * @member {string} preSettlePrice
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.preSettlePrice = "";
    
        /**
         * FuturesQuoteDataBase totalQty.
         * @member {number|Long} totalQty
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.totalQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase positionQty.
         * @member {number|Long} positionQty
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.positionQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase prePositionQty.
         * @member {number|Long} prePositionQty
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.prePositionQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteDataBase currentTime.
         * @member {number|Long} currentTime
         * @memberof FuturesQuoteDataBase
         * @instance
         */
        FuturesQuoteDataBase.prototype.currentTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Creates a new FuturesQuoteDataBase instance using the specified properties.
         * @function create
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {IFuturesQuoteDataBase=} [properties] Properties to set
         * @returns {FuturesQuoteDataBase} FuturesQuoteDataBase instance
         */
        FuturesQuoteDataBase.create = function create(properties) {
            return new FuturesQuoteDataBase(properties);
        };
    
        /**
         * Encodes the specified FuturesQuoteDataBase message. Does not implicitly {@link FuturesQuoteDataBase.verify|verify} messages.
         * @function encode
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {IFuturesQuoteDataBase} message FuturesQuoteDataBase message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesQuoteDataBase.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.time);
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.commodityNo);
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.contractNo);
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.bidPrice);
            if (message.bidPrice2 != null && message.hasOwnProperty("bidPrice2"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.bidPrice2);
            if (message.bidPrice3 != null && message.hasOwnProperty("bidPrice3"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.bidPrice3);
            if (message.bidPrice4 != null && message.hasOwnProperty("bidPrice4"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.bidPrice4);
            if (message.bidPrice5 != null && message.hasOwnProperty("bidPrice5"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.bidPrice5);
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.bidSize);
            if (message.bidSize2 != null && message.hasOwnProperty("bidSize2"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.bidSize2);
            if (message.bidSize3 != null && message.hasOwnProperty("bidSize3"))
                writer.uint32(/* id 11, wireType 0 =*/88).int64(message.bidSize3);
            if (message.bidSize4 != null && message.hasOwnProperty("bidSize4"))
                writer.uint32(/* id 12, wireType 0 =*/96).int64(message.bidSize4);
            if (message.bidSize5 != null && message.hasOwnProperty("bidSize5"))
                writer.uint32(/* id 13, wireType 0 =*/104).int64(message.bidSize5);
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.askPrice);
            if (message.askPrice2 != null && message.hasOwnProperty("askPrice2"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.askPrice2);
            if (message.askPrice3 != null && message.hasOwnProperty("askPrice3"))
                writer.uint32(/* id 16, wireType 2 =*/130).string(message.askPrice3);
            if (message.askPrice4 != null && message.hasOwnProperty("askPrice4"))
                writer.uint32(/* id 17, wireType 2 =*/138).string(message.askPrice4);
            if (message.askPrice5 != null && message.hasOwnProperty("askPrice5"))
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.askPrice5);
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                writer.uint32(/* id 19, wireType 0 =*/152).int64(message.askSize);
            if (message.askSize2 != null && message.hasOwnProperty("askSize2"))
                writer.uint32(/* id 20, wireType 0 =*/160).int64(message.askSize2);
            if (message.askSize3 != null && message.hasOwnProperty("askSize3"))
                writer.uint32(/* id 21, wireType 0 =*/168).int64(message.askSize3);
            if (message.askSize4 != null && message.hasOwnProperty("askSize4"))
                writer.uint32(/* id 22, wireType 0 =*/176).int64(message.askSize4);
            if (message.askSize5 != null && message.hasOwnProperty("askSize5"))
                writer.uint32(/* id 23, wireType 0 =*/184).int64(message.askSize5);
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                writer.uint32(/* id 24, wireType 2 =*/194).string(message.lastPrice);
            if (message.lastSize != null && message.hasOwnProperty("lastSize"))
                writer.uint32(/* id 25, wireType 0 =*/200).int64(message.lastSize);
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                writer.uint32(/* id 26, wireType 2 =*/210).string(message.openPrice);
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                writer.uint32(/* id 27, wireType 2 =*/218).string(message.highPrice);
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                writer.uint32(/* id 28, wireType 2 =*/226).string(message.lowPrice);
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                writer.uint32(/* id 29, wireType 2 =*/234).string(message.closePrice);
            if (message.volume != null && message.hasOwnProperty("volume"))
                writer.uint32(/* id 30, wireType 0 =*/240).int64(message.volume);
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                writer.uint32(/* id 31, wireType 0 =*/248).int64(message.totalVolume);
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                writer.uint32(/* id 32, wireType 2 =*/258).string(message.nowClosePrice);
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                writer.uint32(/* id 33, wireType 2 =*/266).string(message.preSettlePrice);
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                writer.uint32(/* id 34, wireType 0 =*/272).int64(message.totalQty);
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                writer.uint32(/* id 35, wireType 0 =*/280).int64(message.positionQty);
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                writer.uint32(/* id 36, wireType 0 =*/288).int64(message.prePositionQty);
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                writer.uint32(/* id 37, wireType 0 =*/296).int64(message.currentTime);
            return writer;
        };
    
        /**
         * Encodes the specified FuturesQuoteDataBase message, length delimited. Does not implicitly {@link FuturesQuoteDataBase.verify|verify} messages.
         * @function encodeDelimited
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {IFuturesQuoteDataBase} message FuturesQuoteDataBase message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesQuoteDataBase.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a FuturesQuoteDataBase message from the specified reader or buffer.
         * @function decode
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FuturesQuoteDataBase} FuturesQuoteDataBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesQuoteDataBase.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FuturesQuoteDataBase();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.string();
                    break;
                case 2:
                    message.commodityNo = reader.string();
                    break;
                case 3:
                    message.contractNo = reader.string();
                    break;
                case 4:
                    message.bidPrice = reader.string();
                    break;
                case 5:
                    message.bidPrice2 = reader.string();
                    break;
                case 6:
                    message.bidPrice3 = reader.string();
                    break;
                case 7:
                    message.bidPrice4 = reader.string();
                    break;
                case 8:
                    message.bidPrice5 = reader.string();
                    break;
                case 9:
                    message.bidSize = reader.int64();
                    break;
                case 10:
                    message.bidSize2 = reader.int64();
                    break;
                case 11:
                    message.bidSize3 = reader.int64();
                    break;
                case 12:
                    message.bidSize4 = reader.int64();
                    break;
                case 13:
                    message.bidSize5 = reader.int64();
                    break;
                case 14:
                    message.askPrice = reader.string();
                    break;
                case 15:
                    message.askPrice2 = reader.string();
                    break;
                case 16:
                    message.askPrice3 = reader.string();
                    break;
                case 17:
                    message.askPrice4 = reader.string();
                    break;
                case 18:
                    message.askPrice5 = reader.string();
                    break;
                case 19:
                    message.askSize = reader.int64();
                    break;
                case 20:
                    message.askSize2 = reader.int64();
                    break;
                case 21:
                    message.askSize3 = reader.int64();
                    break;
                case 22:
                    message.askSize4 = reader.int64();
                    break;
                case 23:
                    message.askSize5 = reader.int64();
                    break;
                case 24:
                    message.lastPrice = reader.string();
                    break;
                case 25:
                    message.lastSize = reader.int64();
                    break;
                case 26:
                    message.openPrice = reader.string();
                    break;
                case 27:
                    message.highPrice = reader.string();
                    break;
                case 28:
                    message.lowPrice = reader.string();
                    break;
                case 29:
                    message.closePrice = reader.string();
                    break;
                case 30:
                    message.volume = reader.int64();
                    break;
                case 31:
                    message.totalVolume = reader.int64();
                    break;
                case 32:
                    message.nowClosePrice = reader.string();
                    break;
                case 33:
                    message.preSettlePrice = reader.string();
                    break;
                case 34:
                    message.totalQty = reader.int64();
                    break;
                case 35:
                    message.positionQty = reader.int64();
                    break;
                case 36:
                    message.prePositionQty = reader.int64();
                    break;
                case 37:
                    message.currentTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a FuturesQuoteDataBase message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {FuturesQuoteDataBase} FuturesQuoteDataBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesQuoteDataBase.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a FuturesQuoteDataBase message.
         * @function verify
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FuturesQuoteDataBase.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isString(message.time))
                    return "time: string expected";
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                if (!$util.isString(message.commodityNo))
                    return "commodityNo: string expected";
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                if (!$util.isString(message.contractNo))
                    return "contractNo: string expected";
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                if (!$util.isString(message.bidPrice))
                    return "bidPrice: string expected";
            if (message.bidPrice2 != null && message.hasOwnProperty("bidPrice2"))
                if (!$util.isString(message.bidPrice2))
                    return "bidPrice2: string expected";
            if (message.bidPrice3 != null && message.hasOwnProperty("bidPrice3"))
                if (!$util.isString(message.bidPrice3))
                    return "bidPrice3: string expected";
            if (message.bidPrice4 != null && message.hasOwnProperty("bidPrice4"))
                if (!$util.isString(message.bidPrice4))
                    return "bidPrice4: string expected";
            if (message.bidPrice5 != null && message.hasOwnProperty("bidPrice5"))
                if (!$util.isString(message.bidPrice5))
                    return "bidPrice5: string expected";
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                if (!$util.isInteger(message.bidSize) && !(message.bidSize && $util.isInteger(message.bidSize.low) && $util.isInteger(message.bidSize.high)))
                    return "bidSize: integer|Long expected";
            if (message.bidSize2 != null && message.hasOwnProperty("bidSize2"))
                if (!$util.isInteger(message.bidSize2) && !(message.bidSize2 && $util.isInteger(message.bidSize2.low) && $util.isInteger(message.bidSize2.high)))
                    return "bidSize2: integer|Long expected";
            if (message.bidSize3 != null && message.hasOwnProperty("bidSize3"))
                if (!$util.isInteger(message.bidSize3) && !(message.bidSize3 && $util.isInteger(message.bidSize3.low) && $util.isInteger(message.bidSize3.high)))
                    return "bidSize3: integer|Long expected";
            if (message.bidSize4 != null && message.hasOwnProperty("bidSize4"))
                if (!$util.isInteger(message.bidSize4) && !(message.bidSize4 && $util.isInteger(message.bidSize4.low) && $util.isInteger(message.bidSize4.high)))
                    return "bidSize4: integer|Long expected";
            if (message.bidSize5 != null && message.hasOwnProperty("bidSize5"))
                if (!$util.isInteger(message.bidSize5) && !(message.bidSize5 && $util.isInteger(message.bidSize5.low) && $util.isInteger(message.bidSize5.high)))
                    return "bidSize5: integer|Long expected";
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                if (!$util.isString(message.askPrice))
                    return "askPrice: string expected";
            if (message.askPrice2 != null && message.hasOwnProperty("askPrice2"))
                if (!$util.isString(message.askPrice2))
                    return "askPrice2: string expected";
            if (message.askPrice3 != null && message.hasOwnProperty("askPrice3"))
                if (!$util.isString(message.askPrice3))
                    return "askPrice3: string expected";
            if (message.askPrice4 != null && message.hasOwnProperty("askPrice4"))
                if (!$util.isString(message.askPrice4))
                    return "askPrice4: string expected";
            if (message.askPrice5 != null && message.hasOwnProperty("askPrice5"))
                if (!$util.isString(message.askPrice5))
                    return "askPrice5: string expected";
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                if (!$util.isInteger(message.askSize) && !(message.askSize && $util.isInteger(message.askSize.low) && $util.isInteger(message.askSize.high)))
                    return "askSize: integer|Long expected";
            if (message.askSize2 != null && message.hasOwnProperty("askSize2"))
                if (!$util.isInteger(message.askSize2) && !(message.askSize2 && $util.isInteger(message.askSize2.low) && $util.isInteger(message.askSize2.high)))
                    return "askSize2: integer|Long expected";
            if (message.askSize3 != null && message.hasOwnProperty("askSize3"))
                if (!$util.isInteger(message.askSize3) && !(message.askSize3 && $util.isInteger(message.askSize3.low) && $util.isInteger(message.askSize3.high)))
                    return "askSize3: integer|Long expected";
            if (message.askSize4 != null && message.hasOwnProperty("askSize4"))
                if (!$util.isInteger(message.askSize4) && !(message.askSize4 && $util.isInteger(message.askSize4.low) && $util.isInteger(message.askSize4.high)))
                    return "askSize4: integer|Long expected";
            if (message.askSize5 != null && message.hasOwnProperty("askSize5"))
                if (!$util.isInteger(message.askSize5) && !(message.askSize5 && $util.isInteger(message.askSize5.low) && $util.isInteger(message.askSize5.high)))
                    return "askSize5: integer|Long expected";
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                if (!$util.isString(message.lastPrice))
                    return "lastPrice: string expected";
            if (message.lastSize != null && message.hasOwnProperty("lastSize"))
                if (!$util.isInteger(message.lastSize) && !(message.lastSize && $util.isInteger(message.lastSize.low) && $util.isInteger(message.lastSize.high)))
                    return "lastSize: integer|Long expected";
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                if (!$util.isString(message.openPrice))
                    return "openPrice: string expected";
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                if (!$util.isString(message.highPrice))
                    return "highPrice: string expected";
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                if (!$util.isString(message.lowPrice))
                    return "lowPrice: string expected";
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                if (!$util.isString(message.closePrice))
                    return "closePrice: string expected";
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (!$util.isInteger(message.volume) && !(message.volume && $util.isInteger(message.volume.low) && $util.isInteger(message.volume.high)))
                    return "volume: integer|Long expected";
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                if (!$util.isInteger(message.totalVolume) && !(message.totalVolume && $util.isInteger(message.totalVolume.low) && $util.isInteger(message.totalVolume.high)))
                    return "totalVolume: integer|Long expected";
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                if (!$util.isString(message.nowClosePrice))
                    return "nowClosePrice: string expected";
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                if (!$util.isString(message.preSettlePrice))
                    return "preSettlePrice: string expected";
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                if (!$util.isInteger(message.totalQty) && !(message.totalQty && $util.isInteger(message.totalQty.low) && $util.isInteger(message.totalQty.high)))
                    return "totalQty: integer|Long expected";
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                if (!$util.isInteger(message.positionQty) && !(message.positionQty && $util.isInteger(message.positionQty.low) && $util.isInteger(message.positionQty.high)))
                    return "positionQty: integer|Long expected";
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                if (!$util.isInteger(message.prePositionQty) && !(message.prePositionQty && $util.isInteger(message.prePositionQty.low) && $util.isInteger(message.prePositionQty.high)))
                    return "prePositionQty: integer|Long expected";
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (!$util.isInteger(message.currentTime) && !(message.currentTime && $util.isInteger(message.currentTime.low) && $util.isInteger(message.currentTime.high)))
                    return "currentTime: integer|Long expected";
            return null;
        };
    
        /**
         * Creates a FuturesQuoteDataBase message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {FuturesQuoteDataBase} FuturesQuoteDataBase
         */
        FuturesQuoteDataBase.fromObject = function fromObject(object) {
            if (object instanceof $root.FuturesQuoteDataBase)
                return object;
            var message = new $root.FuturesQuoteDataBase();
            if (object.time != null)
                message.time = String(object.time);
            if (object.commodityNo != null)
                message.commodityNo = String(object.commodityNo);
            if (object.contractNo != null)
                message.contractNo = String(object.contractNo);
            if (object.bidPrice != null)
                message.bidPrice = String(object.bidPrice);
            if (object.bidPrice2 != null)
                message.bidPrice2 = String(object.bidPrice2);
            if (object.bidPrice3 != null)
                message.bidPrice3 = String(object.bidPrice3);
            if (object.bidPrice4 != null)
                message.bidPrice4 = String(object.bidPrice4);
            if (object.bidPrice5 != null)
                message.bidPrice5 = String(object.bidPrice5);
            if (object.bidSize != null)
                if ($util.Long)
                    (message.bidSize = $util.Long.fromValue(object.bidSize)).unsigned = false;
                else if (typeof object.bidSize === "string")
                    message.bidSize = parseInt(object.bidSize, 10);
                else if (typeof object.bidSize === "number")
                    message.bidSize = object.bidSize;
                else if (typeof object.bidSize === "object")
                    message.bidSize = new $util.LongBits(object.bidSize.low >>> 0, object.bidSize.high >>> 0).toNumber();
            if (object.bidSize2 != null)
                if ($util.Long)
                    (message.bidSize2 = $util.Long.fromValue(object.bidSize2)).unsigned = false;
                else if (typeof object.bidSize2 === "string")
                    message.bidSize2 = parseInt(object.bidSize2, 10);
                else if (typeof object.bidSize2 === "number")
                    message.bidSize2 = object.bidSize2;
                else if (typeof object.bidSize2 === "object")
                    message.bidSize2 = new $util.LongBits(object.bidSize2.low >>> 0, object.bidSize2.high >>> 0).toNumber();
            if (object.bidSize3 != null)
                if ($util.Long)
                    (message.bidSize3 = $util.Long.fromValue(object.bidSize3)).unsigned = false;
                else if (typeof object.bidSize3 === "string")
                    message.bidSize3 = parseInt(object.bidSize3, 10);
                else if (typeof object.bidSize3 === "number")
                    message.bidSize3 = object.bidSize3;
                else if (typeof object.bidSize3 === "object")
                    message.bidSize3 = new $util.LongBits(object.bidSize3.low >>> 0, object.bidSize3.high >>> 0).toNumber();
            if (object.bidSize4 != null)
                if ($util.Long)
                    (message.bidSize4 = $util.Long.fromValue(object.bidSize4)).unsigned = false;
                else if (typeof object.bidSize4 === "string")
                    message.bidSize4 = parseInt(object.bidSize4, 10);
                else if (typeof object.bidSize4 === "number")
                    message.bidSize4 = object.bidSize4;
                else if (typeof object.bidSize4 === "object")
                    message.bidSize4 = new $util.LongBits(object.bidSize4.low >>> 0, object.bidSize4.high >>> 0).toNumber();
            if (object.bidSize5 != null)
                if ($util.Long)
                    (message.bidSize5 = $util.Long.fromValue(object.bidSize5)).unsigned = false;
                else if (typeof object.bidSize5 === "string")
                    message.bidSize5 = parseInt(object.bidSize5, 10);
                else if (typeof object.bidSize5 === "number")
                    message.bidSize5 = object.bidSize5;
                else if (typeof object.bidSize5 === "object")
                    message.bidSize5 = new $util.LongBits(object.bidSize5.low >>> 0, object.bidSize5.high >>> 0).toNumber();
            if (object.askPrice != null)
                message.askPrice = String(object.askPrice);
            if (object.askPrice2 != null)
                message.askPrice2 = String(object.askPrice2);
            if (object.askPrice3 != null)
                message.askPrice3 = String(object.askPrice3);
            if (object.askPrice4 != null)
                message.askPrice4 = String(object.askPrice4);
            if (object.askPrice5 != null)
                message.askPrice5 = String(object.askPrice5);
            if (object.askSize != null)
                if ($util.Long)
                    (message.askSize = $util.Long.fromValue(object.askSize)).unsigned = false;
                else if (typeof object.askSize === "string")
                    message.askSize = parseInt(object.askSize, 10);
                else if (typeof object.askSize === "number")
                    message.askSize = object.askSize;
                else if (typeof object.askSize === "object")
                    message.askSize = new $util.LongBits(object.askSize.low >>> 0, object.askSize.high >>> 0).toNumber();
            if (object.askSize2 != null)
                if ($util.Long)
                    (message.askSize2 = $util.Long.fromValue(object.askSize2)).unsigned = false;
                else if (typeof object.askSize2 === "string")
                    message.askSize2 = parseInt(object.askSize2, 10);
                else if (typeof object.askSize2 === "number")
                    message.askSize2 = object.askSize2;
                else if (typeof object.askSize2 === "object")
                    message.askSize2 = new $util.LongBits(object.askSize2.low >>> 0, object.askSize2.high >>> 0).toNumber();
            if (object.askSize3 != null)
                if ($util.Long)
                    (message.askSize3 = $util.Long.fromValue(object.askSize3)).unsigned = false;
                else if (typeof object.askSize3 === "string")
                    message.askSize3 = parseInt(object.askSize3, 10);
                else if (typeof object.askSize3 === "number")
                    message.askSize3 = object.askSize3;
                else if (typeof object.askSize3 === "object")
                    message.askSize3 = new $util.LongBits(object.askSize3.low >>> 0, object.askSize3.high >>> 0).toNumber();
            if (object.askSize4 != null)
                if ($util.Long)
                    (message.askSize4 = $util.Long.fromValue(object.askSize4)).unsigned = false;
                else if (typeof object.askSize4 === "string")
                    message.askSize4 = parseInt(object.askSize4, 10);
                else if (typeof object.askSize4 === "number")
                    message.askSize4 = object.askSize4;
                else if (typeof object.askSize4 === "object")
                    message.askSize4 = new $util.LongBits(object.askSize4.low >>> 0, object.askSize4.high >>> 0).toNumber();
            if (object.askSize5 != null)
                if ($util.Long)
                    (message.askSize5 = $util.Long.fromValue(object.askSize5)).unsigned = false;
                else if (typeof object.askSize5 === "string")
                    message.askSize5 = parseInt(object.askSize5, 10);
                else if (typeof object.askSize5 === "number")
                    message.askSize5 = object.askSize5;
                else if (typeof object.askSize5 === "object")
                    message.askSize5 = new $util.LongBits(object.askSize5.low >>> 0, object.askSize5.high >>> 0).toNumber();
            if (object.lastPrice != null)
                message.lastPrice = String(object.lastPrice);
            if (object.lastSize != null)
                if ($util.Long)
                    (message.lastSize = $util.Long.fromValue(object.lastSize)).unsigned = false;
                else if (typeof object.lastSize === "string")
                    message.lastSize = parseInt(object.lastSize, 10);
                else if (typeof object.lastSize === "number")
                    message.lastSize = object.lastSize;
                else if (typeof object.lastSize === "object")
                    message.lastSize = new $util.LongBits(object.lastSize.low >>> 0, object.lastSize.high >>> 0).toNumber();
            if (object.openPrice != null)
                message.openPrice = String(object.openPrice);
            if (object.highPrice != null)
                message.highPrice = String(object.highPrice);
            if (object.lowPrice != null)
                message.lowPrice = String(object.lowPrice);
            if (object.closePrice != null)
                message.closePrice = String(object.closePrice);
            if (object.volume != null)
                if ($util.Long)
                    (message.volume = $util.Long.fromValue(object.volume)).unsigned = false;
                else if (typeof object.volume === "string")
                    message.volume = parseInt(object.volume, 10);
                else if (typeof object.volume === "number")
                    message.volume = object.volume;
                else if (typeof object.volume === "object")
                    message.volume = new $util.LongBits(object.volume.low >>> 0, object.volume.high >>> 0).toNumber();
            if (object.totalVolume != null)
                if ($util.Long)
                    (message.totalVolume = $util.Long.fromValue(object.totalVolume)).unsigned = false;
                else if (typeof object.totalVolume === "string")
                    message.totalVolume = parseInt(object.totalVolume, 10);
                else if (typeof object.totalVolume === "number")
                    message.totalVolume = object.totalVolume;
                else if (typeof object.totalVolume === "object")
                    message.totalVolume = new $util.LongBits(object.totalVolume.low >>> 0, object.totalVolume.high >>> 0).toNumber();
            if (object.nowClosePrice != null)
                message.nowClosePrice = String(object.nowClosePrice);
            if (object.preSettlePrice != null)
                message.preSettlePrice = String(object.preSettlePrice);
            if (object.totalQty != null)
                if ($util.Long)
                    (message.totalQty = $util.Long.fromValue(object.totalQty)).unsigned = false;
                else if (typeof object.totalQty === "string")
                    message.totalQty = parseInt(object.totalQty, 10);
                else if (typeof object.totalQty === "number")
                    message.totalQty = object.totalQty;
                else if (typeof object.totalQty === "object")
                    message.totalQty = new $util.LongBits(object.totalQty.low >>> 0, object.totalQty.high >>> 0).toNumber();
            if (object.positionQty != null)
                if ($util.Long)
                    (message.positionQty = $util.Long.fromValue(object.positionQty)).unsigned = false;
                else if (typeof object.positionQty === "string")
                    message.positionQty = parseInt(object.positionQty, 10);
                else if (typeof object.positionQty === "number")
                    message.positionQty = object.positionQty;
                else if (typeof object.positionQty === "object")
                    message.positionQty = new $util.LongBits(object.positionQty.low >>> 0, object.positionQty.high >>> 0).toNumber();
            if (object.prePositionQty != null)
                if ($util.Long)
                    (message.prePositionQty = $util.Long.fromValue(object.prePositionQty)).unsigned = false;
                else if (typeof object.prePositionQty === "string")
                    message.prePositionQty = parseInt(object.prePositionQty, 10);
                else if (typeof object.prePositionQty === "number")
                    message.prePositionQty = object.prePositionQty;
                else if (typeof object.prePositionQty === "object")
                    message.prePositionQty = new $util.LongBits(object.prePositionQty.low >>> 0, object.prePositionQty.high >>> 0).toNumber();
            if (object.currentTime != null)
                if ($util.Long)
                    (message.currentTime = $util.Long.fromValue(object.currentTime)).unsigned = false;
                else if (typeof object.currentTime === "string")
                    message.currentTime = parseInt(object.currentTime, 10);
                else if (typeof object.currentTime === "number")
                    message.currentTime = object.currentTime;
                else if (typeof object.currentTime === "object")
                    message.currentTime = new $util.LongBits(object.currentTime.low >>> 0, object.currentTime.high >>> 0).toNumber();
            return message;
        };
    
        /**
         * Creates a plain object from a FuturesQuoteDataBase message. Also converts values to other types if specified.
         * @function toObject
         * @memberof FuturesQuoteDataBase
         * @static
         * @param {FuturesQuoteDataBase} message FuturesQuoteDataBase
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FuturesQuoteDataBase.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.time = "";
                object.commodityNo = "";
                object.contractNo = "";
                object.bidPrice = "";
                object.bidPrice2 = "";
                object.bidPrice3 = "";
                object.bidPrice4 = "";
                object.bidPrice5 = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize2 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize2 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize3 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize3 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize4 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize4 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize5 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize5 = options.longs === String ? "0" : 0;
                object.askPrice = "";
                object.askPrice2 = "";
                object.askPrice3 = "";
                object.askPrice4 = "";
                object.askPrice5 = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize2 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize2 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize3 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize3 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize4 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize4 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize5 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize5 = options.longs === String ? "0" : 0;
                object.lastPrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.lastSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.lastSize = options.longs === String ? "0" : 0;
                object.openPrice = "";
                object.highPrice = "";
                object.lowPrice = "";
                object.closePrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.volume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.volume = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.totalVolume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.totalVolume = options.longs === String ? "0" : 0;
                object.nowClosePrice = "";
                object.preSettlePrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.totalQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.totalQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.positionQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.positionQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.prePositionQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.prePositionQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.currentTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.currentTime = options.longs === String ? "0" : 0;
            }
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                object.commodityNo = message.commodityNo;
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                object.contractNo = message.contractNo;
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                object.bidPrice = message.bidPrice;
            if (message.bidPrice2 != null && message.hasOwnProperty("bidPrice2"))
                object.bidPrice2 = message.bidPrice2;
            if (message.bidPrice3 != null && message.hasOwnProperty("bidPrice3"))
                object.bidPrice3 = message.bidPrice3;
            if (message.bidPrice4 != null && message.hasOwnProperty("bidPrice4"))
                object.bidPrice4 = message.bidPrice4;
            if (message.bidPrice5 != null && message.hasOwnProperty("bidPrice5"))
                object.bidPrice5 = message.bidPrice5;
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                if (typeof message.bidSize === "number")
                    object.bidSize = options.longs === String ? String(message.bidSize) : message.bidSize;
                else
                    object.bidSize = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize) : options.longs === Number ? new $util.LongBits(message.bidSize.low >>> 0, message.bidSize.high >>> 0).toNumber() : message.bidSize;
            if (message.bidSize2 != null && message.hasOwnProperty("bidSize2"))
                if (typeof message.bidSize2 === "number")
                    object.bidSize2 = options.longs === String ? String(message.bidSize2) : message.bidSize2;
                else
                    object.bidSize2 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize2) : options.longs === Number ? new $util.LongBits(message.bidSize2.low >>> 0, message.bidSize2.high >>> 0).toNumber() : message.bidSize2;
            if (message.bidSize3 != null && message.hasOwnProperty("bidSize3"))
                if (typeof message.bidSize3 === "number")
                    object.bidSize3 = options.longs === String ? String(message.bidSize3) : message.bidSize3;
                else
                    object.bidSize3 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize3) : options.longs === Number ? new $util.LongBits(message.bidSize3.low >>> 0, message.bidSize3.high >>> 0).toNumber() : message.bidSize3;
            if (message.bidSize4 != null && message.hasOwnProperty("bidSize4"))
                if (typeof message.bidSize4 === "number")
                    object.bidSize4 = options.longs === String ? String(message.bidSize4) : message.bidSize4;
                else
                    object.bidSize4 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize4) : options.longs === Number ? new $util.LongBits(message.bidSize4.low >>> 0, message.bidSize4.high >>> 0).toNumber() : message.bidSize4;
            if (message.bidSize5 != null && message.hasOwnProperty("bidSize5"))
                if (typeof message.bidSize5 === "number")
                    object.bidSize5 = options.longs === String ? String(message.bidSize5) : message.bidSize5;
                else
                    object.bidSize5 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize5) : options.longs === Number ? new $util.LongBits(message.bidSize5.low >>> 0, message.bidSize5.high >>> 0).toNumber() : message.bidSize5;
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                object.askPrice = message.askPrice;
            if (message.askPrice2 != null && message.hasOwnProperty("askPrice2"))
                object.askPrice2 = message.askPrice2;
            if (message.askPrice3 != null && message.hasOwnProperty("askPrice3"))
                object.askPrice3 = message.askPrice3;
            if (message.askPrice4 != null && message.hasOwnProperty("askPrice4"))
                object.askPrice4 = message.askPrice4;
            if (message.askPrice5 != null && message.hasOwnProperty("askPrice5"))
                object.askPrice5 = message.askPrice5;
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                if (typeof message.askSize === "number")
                    object.askSize = options.longs === String ? String(message.askSize) : message.askSize;
                else
                    object.askSize = options.longs === String ? $util.Long.prototype.toString.call(message.askSize) : options.longs === Number ? new $util.LongBits(message.askSize.low >>> 0, message.askSize.high >>> 0).toNumber() : message.askSize;
            if (message.askSize2 != null && message.hasOwnProperty("askSize2"))
                if (typeof message.askSize2 === "number")
                    object.askSize2 = options.longs === String ? String(message.askSize2) : message.askSize2;
                else
                    object.askSize2 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize2) : options.longs === Number ? new $util.LongBits(message.askSize2.low >>> 0, message.askSize2.high >>> 0).toNumber() : message.askSize2;
            if (message.askSize3 != null && message.hasOwnProperty("askSize3"))
                if (typeof message.askSize3 === "number")
                    object.askSize3 = options.longs === String ? String(message.askSize3) : message.askSize3;
                else
                    object.askSize3 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize3) : options.longs === Number ? new $util.LongBits(message.askSize3.low >>> 0, message.askSize3.high >>> 0).toNumber() : message.askSize3;
            if (message.askSize4 != null && message.hasOwnProperty("askSize4"))
                if (typeof message.askSize4 === "number")
                    object.askSize4 = options.longs === String ? String(message.askSize4) : message.askSize4;
                else
                    object.askSize4 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize4) : options.longs === Number ? new $util.LongBits(message.askSize4.low >>> 0, message.askSize4.high >>> 0).toNumber() : message.askSize4;
            if (message.askSize5 != null && message.hasOwnProperty("askSize5"))
                if (typeof message.askSize5 === "number")
                    object.askSize5 = options.longs === String ? String(message.askSize5) : message.askSize5;
                else
                    object.askSize5 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize5) : options.longs === Number ? new $util.LongBits(message.askSize5.low >>> 0, message.askSize5.high >>> 0).toNumber() : message.askSize5;
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                object.lastPrice = message.lastPrice;
            if (message.lastSize != null && message.hasOwnProperty("lastSize"))
                if (typeof message.lastSize === "number")
                    object.lastSize = options.longs === String ? String(message.lastSize) : message.lastSize;
                else
                    object.lastSize = options.longs === String ? $util.Long.prototype.toString.call(message.lastSize) : options.longs === Number ? new $util.LongBits(message.lastSize.low >>> 0, message.lastSize.high >>> 0).toNumber() : message.lastSize;
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                object.openPrice = message.openPrice;
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                object.highPrice = message.highPrice;
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                object.lowPrice = message.lowPrice;
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                object.closePrice = message.closePrice;
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (typeof message.volume === "number")
                    object.volume = options.longs === String ? String(message.volume) : message.volume;
                else
                    object.volume = options.longs === String ? $util.Long.prototype.toString.call(message.volume) : options.longs === Number ? new $util.LongBits(message.volume.low >>> 0, message.volume.high >>> 0).toNumber() : message.volume;
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                if (typeof message.totalVolume === "number")
                    object.totalVolume = options.longs === String ? String(message.totalVolume) : message.totalVolume;
                else
                    object.totalVolume = options.longs === String ? $util.Long.prototype.toString.call(message.totalVolume) : options.longs === Number ? new $util.LongBits(message.totalVolume.low >>> 0, message.totalVolume.high >>> 0).toNumber() : message.totalVolume;
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                object.nowClosePrice = message.nowClosePrice;
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                object.preSettlePrice = message.preSettlePrice;
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                if (typeof message.totalQty === "number")
                    object.totalQty = options.longs === String ? String(message.totalQty) : message.totalQty;
                else
                    object.totalQty = options.longs === String ? $util.Long.prototype.toString.call(message.totalQty) : options.longs === Number ? new $util.LongBits(message.totalQty.low >>> 0, message.totalQty.high >>> 0).toNumber() : message.totalQty;
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                if (typeof message.positionQty === "number")
                    object.positionQty = options.longs === String ? String(message.positionQty) : message.positionQty;
                else
                    object.positionQty = options.longs === String ? $util.Long.prototype.toString.call(message.positionQty) : options.longs === Number ? new $util.LongBits(message.positionQty.low >>> 0, message.positionQty.high >>> 0).toNumber() : message.positionQty;
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                if (typeof message.prePositionQty === "number")
                    object.prePositionQty = options.longs === String ? String(message.prePositionQty) : message.prePositionQty;
                else
                    object.prePositionQty = options.longs === String ? $util.Long.prototype.toString.call(message.prePositionQty) : options.longs === Number ? new $util.LongBits(message.prePositionQty.low >>> 0, message.prePositionQty.high >>> 0).toNumber() : message.prePositionQty;
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (typeof message.currentTime === "number")
                    object.currentTime = options.longs === String ? String(message.currentTime) : message.currentTime;
                else
                    object.currentTime = options.longs === String ? $util.Long.prototype.toString.call(message.currentTime) : options.longs === Number ? new $util.LongBits(message.currentTime.low >>> 0, message.currentTime.high >>> 0).toNumber() : message.currentTime;
            return object;
        };
    
        /**
         * Converts this FuturesQuoteDataBase to JSON.
         * @function toJSON
         * @memberof FuturesQuoteDataBase
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FuturesQuoteDataBase.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return FuturesQuoteDataBase;
    })();
    
    $root.Bundle = (function() {
    
        /**
         * Properties of a Bundle.
         * @exports IBundle
         * @interface IBundle
         * @property {string|null} [pack] Bundle pack
         */
    
        /**
         * Constructs a new Bundle.
         * @exports Bundle
         * @classdesc Represents a Bundle.
         * @implements IBundle
         * @constructor
         * @param {IBundle=} [properties] Properties to set
         */
        function Bundle(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Bundle pack.
         * @member {string} pack
         * @memberof Bundle
         * @instance
         */
        Bundle.prototype.pack = "";
    
        /**
         * Creates a new Bundle instance using the specified properties.
         * @function create
         * @memberof Bundle
         * @static
         * @param {IBundle=} [properties] Properties to set
         * @returns {Bundle} Bundle instance
         */
        Bundle.create = function create(properties) {
            return new Bundle(properties);
        };
    
        /**
         * Encodes the specified Bundle message. Does not implicitly {@link Bundle.verify|verify} messages.
         * @function encode
         * @memberof Bundle
         * @static
         * @param {IBundle} message Bundle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bundle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pack != null && message.hasOwnProperty("pack"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pack);
            return writer;
        };
    
        /**
         * Encodes the specified Bundle message, length delimited. Does not implicitly {@link Bundle.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Bundle
         * @static
         * @param {IBundle} message Bundle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bundle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Bundle message from the specified reader or buffer.
         * @function decode
         * @memberof Bundle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Bundle} Bundle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bundle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Bundle();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pack = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Bundle message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Bundle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Bundle} Bundle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bundle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Bundle message.
         * @function verify
         * @memberof Bundle
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Bundle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pack != null && message.hasOwnProperty("pack"))
                if (!$util.isString(message.pack))
                    return "pack: string expected";
            return null;
        };
    
        /**
         * Creates a Bundle message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Bundle
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Bundle} Bundle
         */
        Bundle.fromObject = function fromObject(object) {
            if (object instanceof $root.Bundle)
                return object;
            var message = new $root.Bundle();
            if (object.pack != null)
                message.pack = String(object.pack);
            return message;
        };
    
        /**
         * Creates a plain object from a Bundle message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Bundle
         * @static
         * @param {Bundle} message Bundle
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Bundle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.pack = "";
            if (message.pack != null && message.hasOwnProperty("pack"))
                object.pack = message.pack;
            return object;
        };
    
        /**
         * Converts this Bundle to JSON.
         * @function toJSON
         * @memberof Bundle
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Bundle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Bundle;
    })();
    
    $root.FuturesQuoteFullDataBase = (function() {
    
        /**
         * Properties of a FuturesQuoteFullDataBase.
         * @exports IFuturesQuoteFullDataBase
         * @interface IFuturesQuoteFullDataBase
         * @property {string|null} [time] FuturesQuoteFullDataBase time
         * @property {string|null} [commodityNo] FuturesQuoteFullDataBase commodityNo
         * @property {string|null} [contractNo] FuturesQuoteFullDataBase contractNo
         * @property {string|null} [bidPrice] FuturesQuoteFullDataBase bidPrice
         * @property {string|null} [bidPrice2] FuturesQuoteFullDataBase bidPrice2
         * @property {string|null} [bidPrice3] FuturesQuoteFullDataBase bidPrice3
         * @property {string|null} [bidPrice4] FuturesQuoteFullDataBase bidPrice4
         * @property {string|null} [bidPrice5] FuturesQuoteFullDataBase bidPrice5
         * @property {string|null} [bidPrice6] FuturesQuoteFullDataBase bidPrice6
         * @property {string|null} [bidPrice7] FuturesQuoteFullDataBase bidPrice7
         * @property {string|null} [bidPrice8] FuturesQuoteFullDataBase bidPrice8
         * @property {string|null} [bidPrice9] FuturesQuoteFullDataBase bidPrice9
         * @property {string|null} [bidPrice10] FuturesQuoteFullDataBase bidPrice10
         * @property {number|Long|null} [bidSize] FuturesQuoteFullDataBase bidSize
         * @property {number|Long|null} [bidSize2] FuturesQuoteFullDataBase bidSize2
         * @property {number|Long|null} [bidSize3] FuturesQuoteFullDataBase bidSize3
         * @property {number|Long|null} [bidSize4] FuturesQuoteFullDataBase bidSize4
         * @property {number|Long|null} [bidSize5] FuturesQuoteFullDataBase bidSize5
         * @property {number|Long|null} [bidSize6] FuturesQuoteFullDataBase bidSize6
         * @property {number|Long|null} [bidSize7] FuturesQuoteFullDataBase bidSize7
         * @property {number|Long|null} [bidSize8] FuturesQuoteFullDataBase bidSize8
         * @property {number|Long|null} [bidSize9] FuturesQuoteFullDataBase bidSize9
         * @property {number|Long|null} [bidSize10] FuturesQuoteFullDataBase bidSize10
         * @property {string|null} [askPrice] FuturesQuoteFullDataBase askPrice
         * @property {string|null} [askPrice2] FuturesQuoteFullDataBase askPrice2
         * @property {string|null} [askPrice3] FuturesQuoteFullDataBase askPrice3
         * @property {string|null} [askPrice4] FuturesQuoteFullDataBase askPrice4
         * @property {string|null} [askPrice5] FuturesQuoteFullDataBase askPrice5
         * @property {string|null} [askPrice6] FuturesQuoteFullDataBase askPrice6
         * @property {string|null} [askPrice7] FuturesQuoteFullDataBase askPrice7
         * @property {string|null} [askPrice8] FuturesQuoteFullDataBase askPrice8
         * @property {string|null} [askPrice9] FuturesQuoteFullDataBase askPrice9
         * @property {string|null} [askPrice10] FuturesQuoteFullDataBase askPrice10
         * @property {number|Long|null} [askSize] FuturesQuoteFullDataBase askSize
         * @property {number|Long|null} [askSize2] FuturesQuoteFullDataBase askSize2
         * @property {number|Long|null} [askSize3] FuturesQuoteFullDataBase askSize3
         * @property {number|Long|null} [askSize4] FuturesQuoteFullDataBase askSize4
         * @property {number|Long|null} [askSize5] FuturesQuoteFullDataBase askSize5
         * @property {number|Long|null} [askSize6] FuturesQuoteFullDataBase askSize6
         * @property {number|Long|null} [askSize7] FuturesQuoteFullDataBase askSize7
         * @property {number|Long|null} [askSize8] FuturesQuoteFullDataBase askSize8
         * @property {number|Long|null} [askSize9] FuturesQuoteFullDataBase askSize9
         * @property {number|Long|null} [askSize10] FuturesQuoteFullDataBase askSize10
         * @property {string|null} [lastPrice] FuturesQuoteFullDataBase lastPrice
         * @property {number|Long|null} [lastSize] FuturesQuoteFullDataBase lastSize
         * @property {string|null} [openPrice] FuturesQuoteFullDataBase openPrice
         * @property {string|null} [highPrice] FuturesQuoteFullDataBase highPrice
         * @property {string|null} [lowPrice] FuturesQuoteFullDataBase lowPrice
         * @property {string|null} [nowClosePrice] FuturesQuoteFullDataBase nowClosePrice
         * @property {string|null} [closePrice] FuturesQuoteFullDataBase closePrice
         * @property {number|Long|null} [volume] FuturesQuoteFullDataBase volume
         * @property {number|Long|null} [totalVolume] FuturesQuoteFullDataBase totalVolume
         * @property {string|null} [preSettlePrice] FuturesQuoteFullDataBase preSettlePrice
         * @property {number|Long|null} [totalQty] FuturesQuoteFullDataBase totalQty
         * @property {number|Long|null} [positionQty] FuturesQuoteFullDataBase positionQty
         * @property {number|Long|null} [prePositionQty] FuturesQuoteFullDataBase prePositionQty
         * @property {number|Long|null} [currentTime] FuturesQuoteFullDataBase currentTime
         */
    
        /**
         * Constructs a new FuturesQuoteFullDataBase.
         * @exports FuturesQuoteFullDataBase
         * @classdesc Represents a FuturesQuoteFullDataBase.
         * @implements IFuturesQuoteFullDataBase
         * @constructor
         * @param {IFuturesQuoteFullDataBase=} [properties] Properties to set
         */
        function FuturesQuoteFullDataBase(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * FuturesQuoteFullDataBase time.
         * @member {string} time
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.time = "";
    
        /**
         * FuturesQuoteFullDataBase commodityNo.
         * @member {string} commodityNo
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.commodityNo = "";
    
        /**
         * FuturesQuoteFullDataBase contractNo.
         * @member {string} contractNo
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.contractNo = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice.
         * @member {string} bidPrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice2.
         * @member {string} bidPrice2
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice2 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice3.
         * @member {string} bidPrice3
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice3 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice4.
         * @member {string} bidPrice4
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice4 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice5.
         * @member {string} bidPrice5
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice5 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice6.
         * @member {string} bidPrice6
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice6 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice7.
         * @member {string} bidPrice7
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice7 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice8.
         * @member {string} bidPrice8
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice8 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice9.
         * @member {string} bidPrice9
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice9 = "";
    
        /**
         * FuturesQuoteFullDataBase bidPrice10.
         * @member {string} bidPrice10
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidPrice10 = "";
    
        /**
         * FuturesQuoteFullDataBase bidSize.
         * @member {number|Long} bidSize
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize2.
         * @member {number|Long} bidSize2
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize2 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize3.
         * @member {number|Long} bidSize3
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize3 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize4.
         * @member {number|Long} bidSize4
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize4 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize5.
         * @member {number|Long} bidSize5
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize5 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize6.
         * @member {number|Long} bidSize6
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize6 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize7.
         * @member {number|Long} bidSize7
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize7 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize8.
         * @member {number|Long} bidSize8
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize8 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize9.
         * @member {number|Long} bidSize9
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize9 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase bidSize10.
         * @member {number|Long} bidSize10
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.bidSize10 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askPrice.
         * @member {string} askPrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice2.
         * @member {string} askPrice2
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice2 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice3.
         * @member {string} askPrice3
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice3 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice4.
         * @member {string} askPrice4
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice4 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice5.
         * @member {string} askPrice5
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice5 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice6.
         * @member {string} askPrice6
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice6 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice7.
         * @member {string} askPrice7
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice7 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice8.
         * @member {string} askPrice8
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice8 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice9.
         * @member {string} askPrice9
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice9 = "";
    
        /**
         * FuturesQuoteFullDataBase askPrice10.
         * @member {string} askPrice10
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askPrice10 = "";
    
        /**
         * FuturesQuoteFullDataBase askSize.
         * @member {number|Long} askSize
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize2.
         * @member {number|Long} askSize2
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize2 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize3.
         * @member {number|Long} askSize3
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize3 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize4.
         * @member {number|Long} askSize4
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize4 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize5.
         * @member {number|Long} askSize5
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize5 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize6.
         * @member {number|Long} askSize6
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize6 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize7.
         * @member {number|Long} askSize7
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize7 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize8.
         * @member {number|Long} askSize8
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize8 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize9.
         * @member {number|Long} askSize9
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize9 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase askSize10.
         * @member {number|Long} askSize10
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.askSize10 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase lastPrice.
         * @member {string} lastPrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.lastPrice = "";
    
        /**
         * FuturesQuoteFullDataBase lastSize.
         * @member {number|Long} lastSize
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.lastSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase openPrice.
         * @member {string} openPrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.openPrice = "";
    
        /**
         * FuturesQuoteFullDataBase highPrice.
         * @member {string} highPrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.highPrice = "";
    
        /**
         * FuturesQuoteFullDataBase lowPrice.
         * @member {string} lowPrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.lowPrice = "";
    
        /**
         * FuturesQuoteFullDataBase nowClosePrice.
         * @member {string} nowClosePrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.nowClosePrice = "";
    
        /**
         * FuturesQuoteFullDataBase closePrice.
         * @member {string} closePrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.closePrice = "";
    
        /**
         * FuturesQuoteFullDataBase volume.
         * @member {number|Long} volume
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.volume = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase totalVolume.
         * @member {number|Long} totalVolume
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.totalVolume = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase preSettlePrice.
         * @member {string} preSettlePrice
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.preSettlePrice = "";
    
        /**
         * FuturesQuoteFullDataBase totalQty.
         * @member {number|Long} totalQty
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.totalQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase positionQty.
         * @member {number|Long} positionQty
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.positionQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase prePositionQty.
         * @member {number|Long} prePositionQty
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.prePositionQty = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * FuturesQuoteFullDataBase currentTime.
         * @member {number|Long} currentTime
         * @memberof FuturesQuoteFullDataBase
         * @instance
         */
        FuturesQuoteFullDataBase.prototype.currentTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Creates a new FuturesQuoteFullDataBase instance using the specified properties.
         * @function create
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {IFuturesQuoteFullDataBase=} [properties] Properties to set
         * @returns {FuturesQuoteFullDataBase} FuturesQuoteFullDataBase instance
         */
        FuturesQuoteFullDataBase.create = function create(properties) {
            return new FuturesQuoteFullDataBase(properties);
        };
    
        /**
         * Encodes the specified FuturesQuoteFullDataBase message. Does not implicitly {@link FuturesQuoteFullDataBase.verify|verify} messages.
         * @function encode
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {IFuturesQuoteFullDataBase} message FuturesQuoteFullDataBase message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesQuoteFullDataBase.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.time);
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.commodityNo);
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.contractNo);
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.bidPrice);
            if (message.bidPrice2 != null && message.hasOwnProperty("bidPrice2"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.bidPrice2);
            if (message.bidPrice3 != null && message.hasOwnProperty("bidPrice3"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.bidPrice3);
            if (message.bidPrice4 != null && message.hasOwnProperty("bidPrice4"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.bidPrice4);
            if (message.bidPrice5 != null && message.hasOwnProperty("bidPrice5"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.bidPrice5);
            if (message.bidPrice6 != null && message.hasOwnProperty("bidPrice6"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.bidPrice6);
            if (message.bidPrice7 != null && message.hasOwnProperty("bidPrice7"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.bidPrice7);
            if (message.bidPrice8 != null && message.hasOwnProperty("bidPrice8"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.bidPrice8);
            if (message.bidPrice9 != null && message.hasOwnProperty("bidPrice9"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.bidPrice9);
            if (message.bidPrice10 != null && message.hasOwnProperty("bidPrice10"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.bidPrice10);
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                writer.uint32(/* id 14, wireType 0 =*/112).int64(message.bidSize);
            if (message.bidSize2 != null && message.hasOwnProperty("bidSize2"))
                writer.uint32(/* id 15, wireType 0 =*/120).int64(message.bidSize2);
            if (message.bidSize3 != null && message.hasOwnProperty("bidSize3"))
                writer.uint32(/* id 16, wireType 0 =*/128).int64(message.bidSize3);
            if (message.bidSize4 != null && message.hasOwnProperty("bidSize4"))
                writer.uint32(/* id 17, wireType 0 =*/136).int64(message.bidSize4);
            if (message.bidSize5 != null && message.hasOwnProperty("bidSize5"))
                writer.uint32(/* id 18, wireType 0 =*/144).int64(message.bidSize5);
            if (message.bidSize6 != null && message.hasOwnProperty("bidSize6"))
                writer.uint32(/* id 19, wireType 0 =*/152).int64(message.bidSize6);
            if (message.bidSize7 != null && message.hasOwnProperty("bidSize7"))
                writer.uint32(/* id 20, wireType 0 =*/160).int64(message.bidSize7);
            if (message.bidSize8 != null && message.hasOwnProperty("bidSize8"))
                writer.uint32(/* id 21, wireType 0 =*/168).int64(message.bidSize8);
            if (message.bidSize9 != null && message.hasOwnProperty("bidSize9"))
                writer.uint32(/* id 22, wireType 0 =*/176).int64(message.bidSize9);
            if (message.bidSize10 != null && message.hasOwnProperty("bidSize10"))
                writer.uint32(/* id 23, wireType 0 =*/184).int64(message.bidSize10);
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                writer.uint32(/* id 24, wireType 2 =*/194).string(message.askPrice);
            if (message.askPrice2 != null && message.hasOwnProperty("askPrice2"))
                writer.uint32(/* id 25, wireType 2 =*/202).string(message.askPrice2);
            if (message.askPrice3 != null && message.hasOwnProperty("askPrice3"))
                writer.uint32(/* id 26, wireType 2 =*/210).string(message.askPrice3);
            if (message.askPrice4 != null && message.hasOwnProperty("askPrice4"))
                writer.uint32(/* id 27, wireType 2 =*/218).string(message.askPrice4);
            if (message.askPrice5 != null && message.hasOwnProperty("askPrice5"))
                writer.uint32(/* id 28, wireType 2 =*/226).string(message.askPrice5);
            if (message.askPrice6 != null && message.hasOwnProperty("askPrice6"))
                writer.uint32(/* id 29, wireType 2 =*/234).string(message.askPrice6);
            if (message.askPrice7 != null && message.hasOwnProperty("askPrice7"))
                writer.uint32(/* id 30, wireType 2 =*/242).string(message.askPrice7);
            if (message.askPrice8 != null && message.hasOwnProperty("askPrice8"))
                writer.uint32(/* id 31, wireType 2 =*/250).string(message.askPrice8);
            if (message.askPrice9 != null && message.hasOwnProperty("askPrice9"))
                writer.uint32(/* id 32, wireType 2 =*/258).string(message.askPrice9);
            if (message.askPrice10 != null && message.hasOwnProperty("askPrice10"))
                writer.uint32(/* id 33, wireType 2 =*/266).string(message.askPrice10);
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                writer.uint32(/* id 34, wireType 0 =*/272).int64(message.askSize);
            if (message.askSize2 != null && message.hasOwnProperty("askSize2"))
                writer.uint32(/* id 35, wireType 0 =*/280).int64(message.askSize2);
            if (message.askSize3 != null && message.hasOwnProperty("askSize3"))
                writer.uint32(/* id 36, wireType 0 =*/288).int64(message.askSize3);
            if (message.askSize4 != null && message.hasOwnProperty("askSize4"))
                writer.uint32(/* id 37, wireType 0 =*/296).int64(message.askSize4);
            if (message.askSize5 != null && message.hasOwnProperty("askSize5"))
                writer.uint32(/* id 38, wireType 0 =*/304).int64(message.askSize5);
            if (message.askSize6 != null && message.hasOwnProperty("askSize6"))
                writer.uint32(/* id 39, wireType 0 =*/312).int64(message.askSize6);
            if (message.askSize7 != null && message.hasOwnProperty("askSize7"))
                writer.uint32(/* id 40, wireType 0 =*/320).int64(message.askSize7);
            if (message.askSize8 != null && message.hasOwnProperty("askSize8"))
                writer.uint32(/* id 41, wireType 0 =*/328).int64(message.askSize8);
            if (message.askSize9 != null && message.hasOwnProperty("askSize9"))
                writer.uint32(/* id 42, wireType 0 =*/336).int64(message.askSize9);
            if (message.askSize10 != null && message.hasOwnProperty("askSize10"))
                writer.uint32(/* id 43, wireType 0 =*/344).int64(message.askSize10);
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                writer.uint32(/* id 44, wireType 2 =*/354).string(message.lastPrice);
            if (message.lastSize != null && message.hasOwnProperty("lastSize"))
                writer.uint32(/* id 45, wireType 0 =*/360).int64(message.lastSize);
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                writer.uint32(/* id 46, wireType 2 =*/370).string(message.openPrice);
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                writer.uint32(/* id 47, wireType 2 =*/378).string(message.highPrice);
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                writer.uint32(/* id 48, wireType 2 =*/386).string(message.lowPrice);
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                writer.uint32(/* id 49, wireType 2 =*/394).string(message.nowClosePrice);
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                writer.uint32(/* id 50, wireType 2 =*/402).string(message.closePrice);
            if (message.volume != null && message.hasOwnProperty("volume"))
                writer.uint32(/* id 51, wireType 0 =*/408).int64(message.volume);
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                writer.uint32(/* id 52, wireType 0 =*/416).int64(message.totalVolume);
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                writer.uint32(/* id 53, wireType 2 =*/426).string(message.preSettlePrice);
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                writer.uint32(/* id 54, wireType 0 =*/432).int64(message.totalQty);
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                writer.uint32(/* id 55, wireType 0 =*/440).int64(message.positionQty);
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                writer.uint32(/* id 56, wireType 0 =*/448).int64(message.prePositionQty);
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                writer.uint32(/* id 57, wireType 0 =*/456).int64(message.currentTime);
            return writer;
        };
    
        /**
         * Encodes the specified FuturesQuoteFullDataBase message, length delimited. Does not implicitly {@link FuturesQuoteFullDataBase.verify|verify} messages.
         * @function encodeDelimited
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {IFuturesQuoteFullDataBase} message FuturesQuoteFullDataBase message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuturesQuoteFullDataBase.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a FuturesQuoteFullDataBase message from the specified reader or buffer.
         * @function decode
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FuturesQuoteFullDataBase} FuturesQuoteFullDataBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesQuoteFullDataBase.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FuturesQuoteFullDataBase();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.string();
                    break;
                case 2:
                    message.commodityNo = reader.string();
                    break;
                case 3:
                    message.contractNo = reader.string();
                    break;
                case 4:
                    message.bidPrice = reader.string();
                    break;
                case 5:
                    message.bidPrice2 = reader.string();
                    break;
                case 6:
                    message.bidPrice3 = reader.string();
                    break;
                case 7:
                    message.bidPrice4 = reader.string();
                    break;
                case 8:
                    message.bidPrice5 = reader.string();
                    break;
                case 9:
                    message.bidPrice6 = reader.string();
                    break;
                case 10:
                    message.bidPrice7 = reader.string();
                    break;
                case 11:
                    message.bidPrice8 = reader.string();
                    break;
                case 12:
                    message.bidPrice9 = reader.string();
                    break;
                case 13:
                    message.bidPrice10 = reader.string();
                    break;
                case 14:
                    message.bidSize = reader.int64();
                    break;
                case 15:
                    message.bidSize2 = reader.int64();
                    break;
                case 16:
                    message.bidSize3 = reader.int64();
                    break;
                case 17:
                    message.bidSize4 = reader.int64();
                    break;
                case 18:
                    message.bidSize5 = reader.int64();
                    break;
                case 19:
                    message.bidSize6 = reader.int64();
                    break;
                case 20:
                    message.bidSize7 = reader.int64();
                    break;
                case 21:
                    message.bidSize8 = reader.int64();
                    break;
                case 22:
                    message.bidSize9 = reader.int64();
                    break;
                case 23:
                    message.bidSize10 = reader.int64();
                    break;
                case 24:
                    message.askPrice = reader.string();
                    break;
                case 25:
                    message.askPrice2 = reader.string();
                    break;
                case 26:
                    message.askPrice3 = reader.string();
                    break;
                case 27:
                    message.askPrice4 = reader.string();
                    break;
                case 28:
                    message.askPrice5 = reader.string();
                    break;
                case 29:
                    message.askPrice6 = reader.string();
                    break;
                case 30:
                    message.askPrice7 = reader.string();
                    break;
                case 31:
                    message.askPrice8 = reader.string();
                    break;
                case 32:
                    message.askPrice9 = reader.string();
                    break;
                case 33:
                    message.askPrice10 = reader.string();
                    break;
                case 34:
                    message.askSize = reader.int64();
                    break;
                case 35:
                    message.askSize2 = reader.int64();
                    break;
                case 36:
                    message.askSize3 = reader.int64();
                    break;
                case 37:
                    message.askSize4 = reader.int64();
                    break;
                case 38:
                    message.askSize5 = reader.int64();
                    break;
                case 39:
                    message.askSize6 = reader.int64();
                    break;
                case 40:
                    message.askSize7 = reader.int64();
                    break;
                case 41:
                    message.askSize8 = reader.int64();
                    break;
                case 42:
                    message.askSize9 = reader.int64();
                    break;
                case 43:
                    message.askSize10 = reader.int64();
                    break;
                case 44:
                    message.lastPrice = reader.string();
                    break;
                case 45:
                    message.lastSize = reader.int64();
                    break;
                case 46:
                    message.openPrice = reader.string();
                    break;
                case 47:
                    message.highPrice = reader.string();
                    break;
                case 48:
                    message.lowPrice = reader.string();
                    break;
                case 49:
                    message.nowClosePrice = reader.string();
                    break;
                case 50:
                    message.closePrice = reader.string();
                    break;
                case 51:
                    message.volume = reader.int64();
                    break;
                case 52:
                    message.totalVolume = reader.int64();
                    break;
                case 53:
                    message.preSettlePrice = reader.string();
                    break;
                case 54:
                    message.totalQty = reader.int64();
                    break;
                case 55:
                    message.positionQty = reader.int64();
                    break;
                case 56:
                    message.prePositionQty = reader.int64();
                    break;
                case 57:
                    message.currentTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a FuturesQuoteFullDataBase message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {FuturesQuoteFullDataBase} FuturesQuoteFullDataBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuturesQuoteFullDataBase.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a FuturesQuoteFullDataBase message.
         * @function verify
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FuturesQuoteFullDataBase.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isString(message.time))
                    return "time: string expected";
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                if (!$util.isString(message.commodityNo))
                    return "commodityNo: string expected";
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                if (!$util.isString(message.contractNo))
                    return "contractNo: string expected";
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                if (!$util.isString(message.bidPrice))
                    return "bidPrice: string expected";
            if (message.bidPrice2 != null && message.hasOwnProperty("bidPrice2"))
                if (!$util.isString(message.bidPrice2))
                    return "bidPrice2: string expected";
            if (message.bidPrice3 != null && message.hasOwnProperty("bidPrice3"))
                if (!$util.isString(message.bidPrice3))
                    return "bidPrice3: string expected";
            if (message.bidPrice4 != null && message.hasOwnProperty("bidPrice4"))
                if (!$util.isString(message.bidPrice4))
                    return "bidPrice4: string expected";
            if (message.bidPrice5 != null && message.hasOwnProperty("bidPrice5"))
                if (!$util.isString(message.bidPrice5))
                    return "bidPrice5: string expected";
            if (message.bidPrice6 != null && message.hasOwnProperty("bidPrice6"))
                if (!$util.isString(message.bidPrice6))
                    return "bidPrice6: string expected";
            if (message.bidPrice7 != null && message.hasOwnProperty("bidPrice7"))
                if (!$util.isString(message.bidPrice7))
                    return "bidPrice7: string expected";
            if (message.bidPrice8 != null && message.hasOwnProperty("bidPrice8"))
                if (!$util.isString(message.bidPrice8))
                    return "bidPrice8: string expected";
            if (message.bidPrice9 != null && message.hasOwnProperty("bidPrice9"))
                if (!$util.isString(message.bidPrice9))
                    return "bidPrice9: string expected";
            if (message.bidPrice10 != null && message.hasOwnProperty("bidPrice10"))
                if (!$util.isString(message.bidPrice10))
                    return "bidPrice10: string expected";
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                if (!$util.isInteger(message.bidSize) && !(message.bidSize && $util.isInteger(message.bidSize.low) && $util.isInteger(message.bidSize.high)))
                    return "bidSize: integer|Long expected";
            if (message.bidSize2 != null && message.hasOwnProperty("bidSize2"))
                if (!$util.isInteger(message.bidSize2) && !(message.bidSize2 && $util.isInteger(message.bidSize2.low) && $util.isInteger(message.bidSize2.high)))
                    return "bidSize2: integer|Long expected";
            if (message.bidSize3 != null && message.hasOwnProperty("bidSize3"))
                if (!$util.isInteger(message.bidSize3) && !(message.bidSize3 && $util.isInteger(message.bidSize3.low) && $util.isInteger(message.bidSize3.high)))
                    return "bidSize3: integer|Long expected";
            if (message.bidSize4 != null && message.hasOwnProperty("bidSize4"))
                if (!$util.isInteger(message.bidSize4) && !(message.bidSize4 && $util.isInteger(message.bidSize4.low) && $util.isInteger(message.bidSize4.high)))
                    return "bidSize4: integer|Long expected";
            if (message.bidSize5 != null && message.hasOwnProperty("bidSize5"))
                if (!$util.isInteger(message.bidSize5) && !(message.bidSize5 && $util.isInteger(message.bidSize5.low) && $util.isInteger(message.bidSize5.high)))
                    return "bidSize5: integer|Long expected";
            if (message.bidSize6 != null && message.hasOwnProperty("bidSize6"))
                if (!$util.isInteger(message.bidSize6) && !(message.bidSize6 && $util.isInteger(message.bidSize6.low) && $util.isInteger(message.bidSize6.high)))
                    return "bidSize6: integer|Long expected";
            if (message.bidSize7 != null && message.hasOwnProperty("bidSize7"))
                if (!$util.isInteger(message.bidSize7) && !(message.bidSize7 && $util.isInteger(message.bidSize7.low) && $util.isInteger(message.bidSize7.high)))
                    return "bidSize7: integer|Long expected";
            if (message.bidSize8 != null && message.hasOwnProperty("bidSize8"))
                if (!$util.isInteger(message.bidSize8) && !(message.bidSize8 && $util.isInteger(message.bidSize8.low) && $util.isInteger(message.bidSize8.high)))
                    return "bidSize8: integer|Long expected";
            if (message.bidSize9 != null && message.hasOwnProperty("bidSize9"))
                if (!$util.isInteger(message.bidSize9) && !(message.bidSize9 && $util.isInteger(message.bidSize9.low) && $util.isInteger(message.bidSize9.high)))
                    return "bidSize9: integer|Long expected";
            if (message.bidSize10 != null && message.hasOwnProperty("bidSize10"))
                if (!$util.isInteger(message.bidSize10) && !(message.bidSize10 && $util.isInteger(message.bidSize10.low) && $util.isInteger(message.bidSize10.high)))
                    return "bidSize10: integer|Long expected";
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                if (!$util.isString(message.askPrice))
                    return "askPrice: string expected";
            if (message.askPrice2 != null && message.hasOwnProperty("askPrice2"))
                if (!$util.isString(message.askPrice2))
                    return "askPrice2: string expected";
            if (message.askPrice3 != null && message.hasOwnProperty("askPrice3"))
                if (!$util.isString(message.askPrice3))
                    return "askPrice3: string expected";
            if (message.askPrice4 != null && message.hasOwnProperty("askPrice4"))
                if (!$util.isString(message.askPrice4))
                    return "askPrice4: string expected";
            if (message.askPrice5 != null && message.hasOwnProperty("askPrice5"))
                if (!$util.isString(message.askPrice5))
                    return "askPrice5: string expected";
            if (message.askPrice6 != null && message.hasOwnProperty("askPrice6"))
                if (!$util.isString(message.askPrice6))
                    return "askPrice6: string expected";
            if (message.askPrice7 != null && message.hasOwnProperty("askPrice7"))
                if (!$util.isString(message.askPrice7))
                    return "askPrice7: string expected";
            if (message.askPrice8 != null && message.hasOwnProperty("askPrice8"))
                if (!$util.isString(message.askPrice8))
                    return "askPrice8: string expected";
            if (message.askPrice9 != null && message.hasOwnProperty("askPrice9"))
                if (!$util.isString(message.askPrice9))
                    return "askPrice9: string expected";
            if (message.askPrice10 != null && message.hasOwnProperty("askPrice10"))
                if (!$util.isString(message.askPrice10))
                    return "askPrice10: string expected";
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                if (!$util.isInteger(message.askSize) && !(message.askSize && $util.isInteger(message.askSize.low) && $util.isInteger(message.askSize.high)))
                    return "askSize: integer|Long expected";
            if (message.askSize2 != null && message.hasOwnProperty("askSize2"))
                if (!$util.isInteger(message.askSize2) && !(message.askSize2 && $util.isInteger(message.askSize2.low) && $util.isInteger(message.askSize2.high)))
                    return "askSize2: integer|Long expected";
            if (message.askSize3 != null && message.hasOwnProperty("askSize3"))
                if (!$util.isInteger(message.askSize3) && !(message.askSize3 && $util.isInteger(message.askSize3.low) && $util.isInteger(message.askSize3.high)))
                    return "askSize3: integer|Long expected";
            if (message.askSize4 != null && message.hasOwnProperty("askSize4"))
                if (!$util.isInteger(message.askSize4) && !(message.askSize4 && $util.isInteger(message.askSize4.low) && $util.isInteger(message.askSize4.high)))
                    return "askSize4: integer|Long expected";
            if (message.askSize5 != null && message.hasOwnProperty("askSize5"))
                if (!$util.isInteger(message.askSize5) && !(message.askSize5 && $util.isInteger(message.askSize5.low) && $util.isInteger(message.askSize5.high)))
                    return "askSize5: integer|Long expected";
            if (message.askSize6 != null && message.hasOwnProperty("askSize6"))
                if (!$util.isInteger(message.askSize6) && !(message.askSize6 && $util.isInteger(message.askSize6.low) && $util.isInteger(message.askSize6.high)))
                    return "askSize6: integer|Long expected";
            if (message.askSize7 != null && message.hasOwnProperty("askSize7"))
                if (!$util.isInteger(message.askSize7) && !(message.askSize7 && $util.isInteger(message.askSize7.low) && $util.isInteger(message.askSize7.high)))
                    return "askSize7: integer|Long expected";
            if (message.askSize8 != null && message.hasOwnProperty("askSize8"))
                if (!$util.isInteger(message.askSize8) && !(message.askSize8 && $util.isInteger(message.askSize8.low) && $util.isInteger(message.askSize8.high)))
                    return "askSize8: integer|Long expected";
            if (message.askSize9 != null && message.hasOwnProperty("askSize9"))
                if (!$util.isInteger(message.askSize9) && !(message.askSize9 && $util.isInteger(message.askSize9.low) && $util.isInteger(message.askSize9.high)))
                    return "askSize9: integer|Long expected";
            if (message.askSize10 != null && message.hasOwnProperty("askSize10"))
                if (!$util.isInteger(message.askSize10) && !(message.askSize10 && $util.isInteger(message.askSize10.low) && $util.isInteger(message.askSize10.high)))
                    return "askSize10: integer|Long expected";
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                if (!$util.isString(message.lastPrice))
                    return "lastPrice: string expected";
            if (message.lastSize != null && message.hasOwnProperty("lastSize"))
                if (!$util.isInteger(message.lastSize) && !(message.lastSize && $util.isInteger(message.lastSize.low) && $util.isInteger(message.lastSize.high)))
                    return "lastSize: integer|Long expected";
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                if (!$util.isString(message.openPrice))
                    return "openPrice: string expected";
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                if (!$util.isString(message.highPrice))
                    return "highPrice: string expected";
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                if (!$util.isString(message.lowPrice))
                    return "lowPrice: string expected";
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                if (!$util.isString(message.nowClosePrice))
                    return "nowClosePrice: string expected";
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                if (!$util.isString(message.closePrice))
                    return "closePrice: string expected";
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (!$util.isInteger(message.volume) && !(message.volume && $util.isInteger(message.volume.low) && $util.isInteger(message.volume.high)))
                    return "volume: integer|Long expected";
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                if (!$util.isInteger(message.totalVolume) && !(message.totalVolume && $util.isInteger(message.totalVolume.low) && $util.isInteger(message.totalVolume.high)))
                    return "totalVolume: integer|Long expected";
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                if (!$util.isString(message.preSettlePrice))
                    return "preSettlePrice: string expected";
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                if (!$util.isInteger(message.totalQty) && !(message.totalQty && $util.isInteger(message.totalQty.low) && $util.isInteger(message.totalQty.high)))
                    return "totalQty: integer|Long expected";
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                if (!$util.isInteger(message.positionQty) && !(message.positionQty && $util.isInteger(message.positionQty.low) && $util.isInteger(message.positionQty.high)))
                    return "positionQty: integer|Long expected";
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                if (!$util.isInteger(message.prePositionQty) && !(message.prePositionQty && $util.isInteger(message.prePositionQty.low) && $util.isInteger(message.prePositionQty.high)))
                    return "prePositionQty: integer|Long expected";
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (!$util.isInteger(message.currentTime) && !(message.currentTime && $util.isInteger(message.currentTime.low) && $util.isInteger(message.currentTime.high)))
                    return "currentTime: integer|Long expected";
            return null;
        };
    
        /**
         * Creates a FuturesQuoteFullDataBase message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {FuturesQuoteFullDataBase} FuturesQuoteFullDataBase
         */
        FuturesQuoteFullDataBase.fromObject = function fromObject(object) {
            if (object instanceof $root.FuturesQuoteFullDataBase)
                return object;
            var message = new $root.FuturesQuoteFullDataBase();
            if (object.time != null)
                message.time = String(object.time);
            if (object.commodityNo != null)
                message.commodityNo = String(object.commodityNo);
            if (object.contractNo != null)
                message.contractNo = String(object.contractNo);
            if (object.bidPrice != null)
                message.bidPrice = String(object.bidPrice);
            if (object.bidPrice2 != null)
                message.bidPrice2 = String(object.bidPrice2);
            if (object.bidPrice3 != null)
                message.bidPrice3 = String(object.bidPrice3);
            if (object.bidPrice4 != null)
                message.bidPrice4 = String(object.bidPrice4);
            if (object.bidPrice5 != null)
                message.bidPrice5 = String(object.bidPrice5);
            if (object.bidPrice6 != null)
                message.bidPrice6 = String(object.bidPrice6);
            if (object.bidPrice7 != null)
                message.bidPrice7 = String(object.bidPrice7);
            if (object.bidPrice8 != null)
                message.bidPrice8 = String(object.bidPrice8);
            if (object.bidPrice9 != null)
                message.bidPrice9 = String(object.bidPrice9);
            if (object.bidPrice10 != null)
                message.bidPrice10 = String(object.bidPrice10);
            if (object.bidSize != null)
                if ($util.Long)
                    (message.bidSize = $util.Long.fromValue(object.bidSize)).unsigned = false;
                else if (typeof object.bidSize === "string")
                    message.bidSize = parseInt(object.bidSize, 10);
                else if (typeof object.bidSize === "number")
                    message.bidSize = object.bidSize;
                else if (typeof object.bidSize === "object")
                    message.bidSize = new $util.LongBits(object.bidSize.low >>> 0, object.bidSize.high >>> 0).toNumber();
            if (object.bidSize2 != null)
                if ($util.Long)
                    (message.bidSize2 = $util.Long.fromValue(object.bidSize2)).unsigned = false;
                else if (typeof object.bidSize2 === "string")
                    message.bidSize2 = parseInt(object.bidSize2, 10);
                else if (typeof object.bidSize2 === "number")
                    message.bidSize2 = object.bidSize2;
                else if (typeof object.bidSize2 === "object")
                    message.bidSize2 = new $util.LongBits(object.bidSize2.low >>> 0, object.bidSize2.high >>> 0).toNumber();
            if (object.bidSize3 != null)
                if ($util.Long)
                    (message.bidSize3 = $util.Long.fromValue(object.bidSize3)).unsigned = false;
                else if (typeof object.bidSize3 === "string")
                    message.bidSize3 = parseInt(object.bidSize3, 10);
                else if (typeof object.bidSize3 === "number")
                    message.bidSize3 = object.bidSize3;
                else if (typeof object.bidSize3 === "object")
                    message.bidSize3 = new $util.LongBits(object.bidSize3.low >>> 0, object.bidSize3.high >>> 0).toNumber();
            if (object.bidSize4 != null)
                if ($util.Long)
                    (message.bidSize4 = $util.Long.fromValue(object.bidSize4)).unsigned = false;
                else if (typeof object.bidSize4 === "string")
                    message.bidSize4 = parseInt(object.bidSize4, 10);
                else if (typeof object.bidSize4 === "number")
                    message.bidSize4 = object.bidSize4;
                else if (typeof object.bidSize4 === "object")
                    message.bidSize4 = new $util.LongBits(object.bidSize4.low >>> 0, object.bidSize4.high >>> 0).toNumber();
            if (object.bidSize5 != null)
                if ($util.Long)
                    (message.bidSize5 = $util.Long.fromValue(object.bidSize5)).unsigned = false;
                else if (typeof object.bidSize5 === "string")
                    message.bidSize5 = parseInt(object.bidSize5, 10);
                else if (typeof object.bidSize5 === "number")
                    message.bidSize5 = object.bidSize5;
                else if (typeof object.bidSize5 === "object")
                    message.bidSize5 = new $util.LongBits(object.bidSize5.low >>> 0, object.bidSize5.high >>> 0).toNumber();
            if (object.bidSize6 != null)
                if ($util.Long)
                    (message.bidSize6 = $util.Long.fromValue(object.bidSize6)).unsigned = false;
                else if (typeof object.bidSize6 === "string")
                    message.bidSize6 = parseInt(object.bidSize6, 10);
                else if (typeof object.bidSize6 === "number")
                    message.bidSize6 = object.bidSize6;
                else if (typeof object.bidSize6 === "object")
                    message.bidSize6 = new $util.LongBits(object.bidSize6.low >>> 0, object.bidSize6.high >>> 0).toNumber();
            if (object.bidSize7 != null)
                if ($util.Long)
                    (message.bidSize7 = $util.Long.fromValue(object.bidSize7)).unsigned = false;
                else if (typeof object.bidSize7 === "string")
                    message.bidSize7 = parseInt(object.bidSize7, 10);
                else if (typeof object.bidSize7 === "number")
                    message.bidSize7 = object.bidSize7;
                else if (typeof object.bidSize7 === "object")
                    message.bidSize7 = new $util.LongBits(object.bidSize7.low >>> 0, object.bidSize7.high >>> 0).toNumber();
            if (object.bidSize8 != null)
                if ($util.Long)
                    (message.bidSize8 = $util.Long.fromValue(object.bidSize8)).unsigned = false;
                else if (typeof object.bidSize8 === "string")
                    message.bidSize8 = parseInt(object.bidSize8, 10);
                else if (typeof object.bidSize8 === "number")
                    message.bidSize8 = object.bidSize8;
                else if (typeof object.bidSize8 === "object")
                    message.bidSize8 = new $util.LongBits(object.bidSize8.low >>> 0, object.bidSize8.high >>> 0).toNumber();
            if (object.bidSize9 != null)
                if ($util.Long)
                    (message.bidSize9 = $util.Long.fromValue(object.bidSize9)).unsigned = false;
                else if (typeof object.bidSize9 === "string")
                    message.bidSize9 = parseInt(object.bidSize9, 10);
                else if (typeof object.bidSize9 === "number")
                    message.bidSize9 = object.bidSize9;
                else if (typeof object.bidSize9 === "object")
                    message.bidSize9 = new $util.LongBits(object.bidSize9.low >>> 0, object.bidSize9.high >>> 0).toNumber();
            if (object.bidSize10 != null)
                if ($util.Long)
                    (message.bidSize10 = $util.Long.fromValue(object.bidSize10)).unsigned = false;
                else if (typeof object.bidSize10 === "string")
                    message.bidSize10 = parseInt(object.bidSize10, 10);
                else if (typeof object.bidSize10 === "number")
                    message.bidSize10 = object.bidSize10;
                else if (typeof object.bidSize10 === "object")
                    message.bidSize10 = new $util.LongBits(object.bidSize10.low >>> 0, object.bidSize10.high >>> 0).toNumber();
            if (object.askPrice != null)
                message.askPrice = String(object.askPrice);
            if (object.askPrice2 != null)
                message.askPrice2 = String(object.askPrice2);
            if (object.askPrice3 != null)
                message.askPrice3 = String(object.askPrice3);
            if (object.askPrice4 != null)
                message.askPrice4 = String(object.askPrice4);
            if (object.askPrice5 != null)
                message.askPrice5 = String(object.askPrice5);
            if (object.askPrice6 != null)
                message.askPrice6 = String(object.askPrice6);
            if (object.askPrice7 != null)
                message.askPrice7 = String(object.askPrice7);
            if (object.askPrice8 != null)
                message.askPrice8 = String(object.askPrice8);
            if (object.askPrice9 != null)
                message.askPrice9 = String(object.askPrice9);
            if (object.askPrice10 != null)
                message.askPrice10 = String(object.askPrice10);
            if (object.askSize != null)
                if ($util.Long)
                    (message.askSize = $util.Long.fromValue(object.askSize)).unsigned = false;
                else if (typeof object.askSize === "string")
                    message.askSize = parseInt(object.askSize, 10);
                else if (typeof object.askSize === "number")
                    message.askSize = object.askSize;
                else if (typeof object.askSize === "object")
                    message.askSize = new $util.LongBits(object.askSize.low >>> 0, object.askSize.high >>> 0).toNumber();
            if (object.askSize2 != null)
                if ($util.Long)
                    (message.askSize2 = $util.Long.fromValue(object.askSize2)).unsigned = false;
                else if (typeof object.askSize2 === "string")
                    message.askSize2 = parseInt(object.askSize2, 10);
                else if (typeof object.askSize2 === "number")
                    message.askSize2 = object.askSize2;
                else if (typeof object.askSize2 === "object")
                    message.askSize2 = new $util.LongBits(object.askSize2.low >>> 0, object.askSize2.high >>> 0).toNumber();
            if (object.askSize3 != null)
                if ($util.Long)
                    (message.askSize3 = $util.Long.fromValue(object.askSize3)).unsigned = false;
                else if (typeof object.askSize3 === "string")
                    message.askSize3 = parseInt(object.askSize3, 10);
                else if (typeof object.askSize3 === "number")
                    message.askSize3 = object.askSize3;
                else if (typeof object.askSize3 === "object")
                    message.askSize3 = new $util.LongBits(object.askSize3.low >>> 0, object.askSize3.high >>> 0).toNumber();
            if (object.askSize4 != null)
                if ($util.Long)
                    (message.askSize4 = $util.Long.fromValue(object.askSize4)).unsigned = false;
                else if (typeof object.askSize4 === "string")
                    message.askSize4 = parseInt(object.askSize4, 10);
                else if (typeof object.askSize4 === "number")
                    message.askSize4 = object.askSize4;
                else if (typeof object.askSize4 === "object")
                    message.askSize4 = new $util.LongBits(object.askSize4.low >>> 0, object.askSize4.high >>> 0).toNumber();
            if (object.askSize5 != null)
                if ($util.Long)
                    (message.askSize5 = $util.Long.fromValue(object.askSize5)).unsigned = false;
                else if (typeof object.askSize5 === "string")
                    message.askSize5 = parseInt(object.askSize5, 10);
                else if (typeof object.askSize5 === "number")
                    message.askSize5 = object.askSize5;
                else if (typeof object.askSize5 === "object")
                    message.askSize5 = new $util.LongBits(object.askSize5.low >>> 0, object.askSize5.high >>> 0).toNumber();
            if (object.askSize6 != null)
                if ($util.Long)
                    (message.askSize6 = $util.Long.fromValue(object.askSize6)).unsigned = false;
                else if (typeof object.askSize6 === "string")
                    message.askSize6 = parseInt(object.askSize6, 10);
                else if (typeof object.askSize6 === "number")
                    message.askSize6 = object.askSize6;
                else if (typeof object.askSize6 === "object")
                    message.askSize6 = new $util.LongBits(object.askSize6.low >>> 0, object.askSize6.high >>> 0).toNumber();
            if (object.askSize7 != null)
                if ($util.Long)
                    (message.askSize7 = $util.Long.fromValue(object.askSize7)).unsigned = false;
                else if (typeof object.askSize7 === "string")
                    message.askSize7 = parseInt(object.askSize7, 10);
                else if (typeof object.askSize7 === "number")
                    message.askSize7 = object.askSize7;
                else if (typeof object.askSize7 === "object")
                    message.askSize7 = new $util.LongBits(object.askSize7.low >>> 0, object.askSize7.high >>> 0).toNumber();
            if (object.askSize8 != null)
                if ($util.Long)
                    (message.askSize8 = $util.Long.fromValue(object.askSize8)).unsigned = false;
                else if (typeof object.askSize8 === "string")
                    message.askSize8 = parseInt(object.askSize8, 10);
                else if (typeof object.askSize8 === "number")
                    message.askSize8 = object.askSize8;
                else if (typeof object.askSize8 === "object")
                    message.askSize8 = new $util.LongBits(object.askSize8.low >>> 0, object.askSize8.high >>> 0).toNumber();
            if (object.askSize9 != null)
                if ($util.Long)
                    (message.askSize9 = $util.Long.fromValue(object.askSize9)).unsigned = false;
                else if (typeof object.askSize9 === "string")
                    message.askSize9 = parseInt(object.askSize9, 10);
                else if (typeof object.askSize9 === "number")
                    message.askSize9 = object.askSize9;
                else if (typeof object.askSize9 === "object")
                    message.askSize9 = new $util.LongBits(object.askSize9.low >>> 0, object.askSize9.high >>> 0).toNumber();
            if (object.askSize10 != null)
                if ($util.Long)
                    (message.askSize10 = $util.Long.fromValue(object.askSize10)).unsigned = false;
                else if (typeof object.askSize10 === "string")
                    message.askSize10 = parseInt(object.askSize10, 10);
                else if (typeof object.askSize10 === "number")
                    message.askSize10 = object.askSize10;
                else if (typeof object.askSize10 === "object")
                    message.askSize10 = new $util.LongBits(object.askSize10.low >>> 0, object.askSize10.high >>> 0).toNumber();
            if (object.lastPrice != null)
                message.lastPrice = String(object.lastPrice);
            if (object.lastSize != null)
                if ($util.Long)
                    (message.lastSize = $util.Long.fromValue(object.lastSize)).unsigned = false;
                else if (typeof object.lastSize === "string")
                    message.lastSize = parseInt(object.lastSize, 10);
                else if (typeof object.lastSize === "number")
                    message.lastSize = object.lastSize;
                else if (typeof object.lastSize === "object")
                    message.lastSize = new $util.LongBits(object.lastSize.low >>> 0, object.lastSize.high >>> 0).toNumber();
            if (object.openPrice != null)
                message.openPrice = String(object.openPrice);
            if (object.highPrice != null)
                message.highPrice = String(object.highPrice);
            if (object.lowPrice != null)
                message.lowPrice = String(object.lowPrice);
            if (object.nowClosePrice != null)
                message.nowClosePrice = String(object.nowClosePrice);
            if (object.closePrice != null)
                message.closePrice = String(object.closePrice);
            if (object.volume != null)
                if ($util.Long)
                    (message.volume = $util.Long.fromValue(object.volume)).unsigned = false;
                else if (typeof object.volume === "string")
                    message.volume = parseInt(object.volume, 10);
                else if (typeof object.volume === "number")
                    message.volume = object.volume;
                else if (typeof object.volume === "object")
                    message.volume = new $util.LongBits(object.volume.low >>> 0, object.volume.high >>> 0).toNumber();
            if (object.totalVolume != null)
                if ($util.Long)
                    (message.totalVolume = $util.Long.fromValue(object.totalVolume)).unsigned = false;
                else if (typeof object.totalVolume === "string")
                    message.totalVolume = parseInt(object.totalVolume, 10);
                else if (typeof object.totalVolume === "number")
                    message.totalVolume = object.totalVolume;
                else if (typeof object.totalVolume === "object")
                    message.totalVolume = new $util.LongBits(object.totalVolume.low >>> 0, object.totalVolume.high >>> 0).toNumber();
            if (object.preSettlePrice != null)
                message.preSettlePrice = String(object.preSettlePrice);
            if (object.totalQty != null)
                if ($util.Long)
                    (message.totalQty = $util.Long.fromValue(object.totalQty)).unsigned = false;
                else if (typeof object.totalQty === "string")
                    message.totalQty = parseInt(object.totalQty, 10);
                else if (typeof object.totalQty === "number")
                    message.totalQty = object.totalQty;
                else if (typeof object.totalQty === "object")
                    message.totalQty = new $util.LongBits(object.totalQty.low >>> 0, object.totalQty.high >>> 0).toNumber();
            if (object.positionQty != null)
                if ($util.Long)
                    (message.positionQty = $util.Long.fromValue(object.positionQty)).unsigned = false;
                else if (typeof object.positionQty === "string")
                    message.positionQty = parseInt(object.positionQty, 10);
                else if (typeof object.positionQty === "number")
                    message.positionQty = object.positionQty;
                else if (typeof object.positionQty === "object")
                    message.positionQty = new $util.LongBits(object.positionQty.low >>> 0, object.positionQty.high >>> 0).toNumber();
            if (object.prePositionQty != null)
                if ($util.Long)
                    (message.prePositionQty = $util.Long.fromValue(object.prePositionQty)).unsigned = false;
                else if (typeof object.prePositionQty === "string")
                    message.prePositionQty = parseInt(object.prePositionQty, 10);
                else if (typeof object.prePositionQty === "number")
                    message.prePositionQty = object.prePositionQty;
                else if (typeof object.prePositionQty === "object")
                    message.prePositionQty = new $util.LongBits(object.prePositionQty.low >>> 0, object.prePositionQty.high >>> 0).toNumber();
            if (object.currentTime != null)
                if ($util.Long)
                    (message.currentTime = $util.Long.fromValue(object.currentTime)).unsigned = false;
                else if (typeof object.currentTime === "string")
                    message.currentTime = parseInt(object.currentTime, 10);
                else if (typeof object.currentTime === "number")
                    message.currentTime = object.currentTime;
                else if (typeof object.currentTime === "object")
                    message.currentTime = new $util.LongBits(object.currentTime.low >>> 0, object.currentTime.high >>> 0).toNumber();
            return message;
        };
    
        /**
         * Creates a plain object from a FuturesQuoteFullDataBase message. Also converts values to other types if specified.
         * @function toObject
         * @memberof FuturesQuoteFullDataBase
         * @static
         * @param {FuturesQuoteFullDataBase} message FuturesQuoteFullDataBase
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FuturesQuoteFullDataBase.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.time = "";
                object.commodityNo = "";
                object.contractNo = "";
                object.bidPrice = "";
                object.bidPrice2 = "";
                object.bidPrice3 = "";
                object.bidPrice4 = "";
                object.bidPrice5 = "";
                object.bidPrice6 = "";
                object.bidPrice7 = "";
                object.bidPrice8 = "";
                object.bidPrice9 = "";
                object.bidPrice10 = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize2 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize2 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize3 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize3 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize4 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize4 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize5 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize5 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize6 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize6 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize7 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize7 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize8 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize8 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize9 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize9 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bidSize10 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bidSize10 = options.longs === String ? "0" : 0;
                object.askPrice = "";
                object.askPrice2 = "";
                object.askPrice3 = "";
                object.askPrice4 = "";
                object.askPrice5 = "";
                object.askPrice6 = "";
                object.askPrice7 = "";
                object.askPrice8 = "";
                object.askPrice9 = "";
                object.askPrice10 = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize2 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize2 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize3 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize3 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize4 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize4 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize5 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize5 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize6 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize6 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize7 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize7 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize8 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize8 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize9 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize9 = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.askSize10 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.askSize10 = options.longs === String ? "0" : 0;
                object.lastPrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.lastSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.lastSize = options.longs === String ? "0" : 0;
                object.openPrice = "";
                object.highPrice = "";
                object.lowPrice = "";
                object.nowClosePrice = "";
                object.closePrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.volume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.volume = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.totalVolume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.totalVolume = options.longs === String ? "0" : 0;
                object.preSettlePrice = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.totalQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.totalQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.positionQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.positionQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.prePositionQty = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.prePositionQty = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.currentTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.currentTime = options.longs === String ? "0" : 0;
            }
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            if (message.commodityNo != null && message.hasOwnProperty("commodityNo"))
                object.commodityNo = message.commodityNo;
            if (message.contractNo != null && message.hasOwnProperty("contractNo"))
                object.contractNo = message.contractNo;
            if (message.bidPrice != null && message.hasOwnProperty("bidPrice"))
                object.bidPrice = message.bidPrice;
            if (message.bidPrice2 != null && message.hasOwnProperty("bidPrice2"))
                object.bidPrice2 = message.bidPrice2;
            if (message.bidPrice3 != null && message.hasOwnProperty("bidPrice3"))
                object.bidPrice3 = message.bidPrice3;
            if (message.bidPrice4 != null && message.hasOwnProperty("bidPrice4"))
                object.bidPrice4 = message.bidPrice4;
            if (message.bidPrice5 != null && message.hasOwnProperty("bidPrice5"))
                object.bidPrice5 = message.bidPrice5;
            if (message.bidPrice6 != null && message.hasOwnProperty("bidPrice6"))
                object.bidPrice6 = message.bidPrice6;
            if (message.bidPrice7 != null && message.hasOwnProperty("bidPrice7"))
                object.bidPrice7 = message.bidPrice7;
            if (message.bidPrice8 != null && message.hasOwnProperty("bidPrice8"))
                object.bidPrice8 = message.bidPrice8;
            if (message.bidPrice9 != null && message.hasOwnProperty("bidPrice9"))
                object.bidPrice9 = message.bidPrice9;
            if (message.bidPrice10 != null && message.hasOwnProperty("bidPrice10"))
                object.bidPrice10 = message.bidPrice10;
            if (message.bidSize != null && message.hasOwnProperty("bidSize"))
                if (typeof message.bidSize === "number")
                    object.bidSize = options.longs === String ? String(message.bidSize) : message.bidSize;
                else
                    object.bidSize = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize) : options.longs === Number ? new $util.LongBits(message.bidSize.low >>> 0, message.bidSize.high >>> 0).toNumber() : message.bidSize;
            if (message.bidSize2 != null && message.hasOwnProperty("bidSize2"))
                if (typeof message.bidSize2 === "number")
                    object.bidSize2 = options.longs === String ? String(message.bidSize2) : message.bidSize2;
                else
                    object.bidSize2 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize2) : options.longs === Number ? new $util.LongBits(message.bidSize2.low >>> 0, message.bidSize2.high >>> 0).toNumber() : message.bidSize2;
            if (message.bidSize3 != null && message.hasOwnProperty("bidSize3"))
                if (typeof message.bidSize3 === "number")
                    object.bidSize3 = options.longs === String ? String(message.bidSize3) : message.bidSize3;
                else
                    object.bidSize3 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize3) : options.longs === Number ? new $util.LongBits(message.bidSize3.low >>> 0, message.bidSize3.high >>> 0).toNumber() : message.bidSize3;
            if (message.bidSize4 != null && message.hasOwnProperty("bidSize4"))
                if (typeof message.bidSize4 === "number")
                    object.bidSize4 = options.longs === String ? String(message.bidSize4) : message.bidSize4;
                else
                    object.bidSize4 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize4) : options.longs === Number ? new $util.LongBits(message.bidSize4.low >>> 0, message.bidSize4.high >>> 0).toNumber() : message.bidSize4;
            if (message.bidSize5 != null && message.hasOwnProperty("bidSize5"))
                if (typeof message.bidSize5 === "number")
                    object.bidSize5 = options.longs === String ? String(message.bidSize5) : message.bidSize5;
                else
                    object.bidSize5 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize5) : options.longs === Number ? new $util.LongBits(message.bidSize5.low >>> 0, message.bidSize5.high >>> 0).toNumber() : message.bidSize5;
            if (message.bidSize6 != null && message.hasOwnProperty("bidSize6"))
                if (typeof message.bidSize6 === "number")
                    object.bidSize6 = options.longs === String ? String(message.bidSize6) : message.bidSize6;
                else
                    object.bidSize6 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize6) : options.longs === Number ? new $util.LongBits(message.bidSize6.low >>> 0, message.bidSize6.high >>> 0).toNumber() : message.bidSize6;
            if (message.bidSize7 != null && message.hasOwnProperty("bidSize7"))
                if (typeof message.bidSize7 === "number")
                    object.bidSize7 = options.longs === String ? String(message.bidSize7) : message.bidSize7;
                else
                    object.bidSize7 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize7) : options.longs === Number ? new $util.LongBits(message.bidSize7.low >>> 0, message.bidSize7.high >>> 0).toNumber() : message.bidSize7;
            if (message.bidSize8 != null && message.hasOwnProperty("bidSize8"))
                if (typeof message.bidSize8 === "number")
                    object.bidSize8 = options.longs === String ? String(message.bidSize8) : message.bidSize8;
                else
                    object.bidSize8 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize8) : options.longs === Number ? new $util.LongBits(message.bidSize8.low >>> 0, message.bidSize8.high >>> 0).toNumber() : message.bidSize8;
            if (message.bidSize9 != null && message.hasOwnProperty("bidSize9"))
                if (typeof message.bidSize9 === "number")
                    object.bidSize9 = options.longs === String ? String(message.bidSize9) : message.bidSize9;
                else
                    object.bidSize9 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize9) : options.longs === Number ? new $util.LongBits(message.bidSize9.low >>> 0, message.bidSize9.high >>> 0).toNumber() : message.bidSize9;
            if (message.bidSize10 != null && message.hasOwnProperty("bidSize10"))
                if (typeof message.bidSize10 === "number")
                    object.bidSize10 = options.longs === String ? String(message.bidSize10) : message.bidSize10;
                else
                    object.bidSize10 = options.longs === String ? $util.Long.prototype.toString.call(message.bidSize10) : options.longs === Number ? new $util.LongBits(message.bidSize10.low >>> 0, message.bidSize10.high >>> 0).toNumber() : message.bidSize10;
            if (message.askPrice != null && message.hasOwnProperty("askPrice"))
                object.askPrice = message.askPrice;
            if (message.askPrice2 != null && message.hasOwnProperty("askPrice2"))
                object.askPrice2 = message.askPrice2;
            if (message.askPrice3 != null && message.hasOwnProperty("askPrice3"))
                object.askPrice3 = message.askPrice3;
            if (message.askPrice4 != null && message.hasOwnProperty("askPrice4"))
                object.askPrice4 = message.askPrice4;
            if (message.askPrice5 != null && message.hasOwnProperty("askPrice5"))
                object.askPrice5 = message.askPrice5;
            if (message.askPrice6 != null && message.hasOwnProperty("askPrice6"))
                object.askPrice6 = message.askPrice6;
            if (message.askPrice7 != null && message.hasOwnProperty("askPrice7"))
                object.askPrice7 = message.askPrice7;
            if (message.askPrice8 != null && message.hasOwnProperty("askPrice8"))
                object.askPrice8 = message.askPrice8;
            if (message.askPrice9 != null && message.hasOwnProperty("askPrice9"))
                object.askPrice9 = message.askPrice9;
            if (message.askPrice10 != null && message.hasOwnProperty("askPrice10"))
                object.askPrice10 = message.askPrice10;
            if (message.askSize != null && message.hasOwnProperty("askSize"))
                if (typeof message.askSize === "number")
                    object.askSize = options.longs === String ? String(message.askSize) : message.askSize;
                else
                    object.askSize = options.longs === String ? $util.Long.prototype.toString.call(message.askSize) : options.longs === Number ? new $util.LongBits(message.askSize.low >>> 0, message.askSize.high >>> 0).toNumber() : message.askSize;
            if (message.askSize2 != null && message.hasOwnProperty("askSize2"))
                if (typeof message.askSize2 === "number")
                    object.askSize2 = options.longs === String ? String(message.askSize2) : message.askSize2;
                else
                    object.askSize2 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize2) : options.longs === Number ? new $util.LongBits(message.askSize2.low >>> 0, message.askSize2.high >>> 0).toNumber() : message.askSize2;
            if (message.askSize3 != null && message.hasOwnProperty("askSize3"))
                if (typeof message.askSize3 === "number")
                    object.askSize3 = options.longs === String ? String(message.askSize3) : message.askSize3;
                else
                    object.askSize3 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize3) : options.longs === Number ? new $util.LongBits(message.askSize3.low >>> 0, message.askSize3.high >>> 0).toNumber() : message.askSize3;
            if (message.askSize4 != null && message.hasOwnProperty("askSize4"))
                if (typeof message.askSize4 === "number")
                    object.askSize4 = options.longs === String ? String(message.askSize4) : message.askSize4;
                else
                    object.askSize4 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize4) : options.longs === Number ? new $util.LongBits(message.askSize4.low >>> 0, message.askSize4.high >>> 0).toNumber() : message.askSize4;
            if (message.askSize5 != null && message.hasOwnProperty("askSize5"))
                if (typeof message.askSize5 === "number")
                    object.askSize5 = options.longs === String ? String(message.askSize5) : message.askSize5;
                else
                    object.askSize5 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize5) : options.longs === Number ? new $util.LongBits(message.askSize5.low >>> 0, message.askSize5.high >>> 0).toNumber() : message.askSize5;
            if (message.askSize6 != null && message.hasOwnProperty("askSize6"))
                if (typeof message.askSize6 === "number")
                    object.askSize6 = options.longs === String ? String(message.askSize6) : message.askSize6;
                else
                    object.askSize6 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize6) : options.longs === Number ? new $util.LongBits(message.askSize6.low >>> 0, message.askSize6.high >>> 0).toNumber() : message.askSize6;
            if (message.askSize7 != null && message.hasOwnProperty("askSize7"))
                if (typeof message.askSize7 === "number")
                    object.askSize7 = options.longs === String ? String(message.askSize7) : message.askSize7;
                else
                    object.askSize7 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize7) : options.longs === Number ? new $util.LongBits(message.askSize7.low >>> 0, message.askSize7.high >>> 0).toNumber() : message.askSize7;
            if (message.askSize8 != null && message.hasOwnProperty("askSize8"))
                if (typeof message.askSize8 === "number")
                    object.askSize8 = options.longs === String ? String(message.askSize8) : message.askSize8;
                else
                    object.askSize8 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize8) : options.longs === Number ? new $util.LongBits(message.askSize8.low >>> 0, message.askSize8.high >>> 0).toNumber() : message.askSize8;
            if (message.askSize9 != null && message.hasOwnProperty("askSize9"))
                if (typeof message.askSize9 === "number")
                    object.askSize9 = options.longs === String ? String(message.askSize9) : message.askSize9;
                else
                    object.askSize9 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize9) : options.longs === Number ? new $util.LongBits(message.askSize9.low >>> 0, message.askSize9.high >>> 0).toNumber() : message.askSize9;
            if (message.askSize10 != null && message.hasOwnProperty("askSize10"))
                if (typeof message.askSize10 === "number")
                    object.askSize10 = options.longs === String ? String(message.askSize10) : message.askSize10;
                else
                    object.askSize10 = options.longs === String ? $util.Long.prototype.toString.call(message.askSize10) : options.longs === Number ? new $util.LongBits(message.askSize10.low >>> 0, message.askSize10.high >>> 0).toNumber() : message.askSize10;
            if (message.lastPrice != null && message.hasOwnProperty("lastPrice"))
                object.lastPrice = message.lastPrice;
            if (message.lastSize != null && message.hasOwnProperty("lastSize"))
                if (typeof message.lastSize === "number")
                    object.lastSize = options.longs === String ? String(message.lastSize) : message.lastSize;
                else
                    object.lastSize = options.longs === String ? $util.Long.prototype.toString.call(message.lastSize) : options.longs === Number ? new $util.LongBits(message.lastSize.low >>> 0, message.lastSize.high >>> 0).toNumber() : message.lastSize;
            if (message.openPrice != null && message.hasOwnProperty("openPrice"))
                object.openPrice = message.openPrice;
            if (message.highPrice != null && message.hasOwnProperty("highPrice"))
                object.highPrice = message.highPrice;
            if (message.lowPrice != null && message.hasOwnProperty("lowPrice"))
                object.lowPrice = message.lowPrice;
            if (message.nowClosePrice != null && message.hasOwnProperty("nowClosePrice"))
                object.nowClosePrice = message.nowClosePrice;
            if (message.closePrice != null && message.hasOwnProperty("closePrice"))
                object.closePrice = message.closePrice;
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (typeof message.volume === "number")
                    object.volume = options.longs === String ? String(message.volume) : message.volume;
                else
                    object.volume = options.longs === String ? $util.Long.prototype.toString.call(message.volume) : options.longs === Number ? new $util.LongBits(message.volume.low >>> 0, message.volume.high >>> 0).toNumber() : message.volume;
            if (message.totalVolume != null && message.hasOwnProperty("totalVolume"))
                if (typeof message.totalVolume === "number")
                    object.totalVolume = options.longs === String ? String(message.totalVolume) : message.totalVolume;
                else
                    object.totalVolume = options.longs === String ? $util.Long.prototype.toString.call(message.totalVolume) : options.longs === Number ? new $util.LongBits(message.totalVolume.low >>> 0, message.totalVolume.high >>> 0).toNumber() : message.totalVolume;
            if (message.preSettlePrice != null && message.hasOwnProperty("preSettlePrice"))
                object.preSettlePrice = message.preSettlePrice;
            if (message.totalQty != null && message.hasOwnProperty("totalQty"))
                if (typeof message.totalQty === "number")
                    object.totalQty = options.longs === String ? String(message.totalQty) : message.totalQty;
                else
                    object.totalQty = options.longs === String ? $util.Long.prototype.toString.call(message.totalQty) : options.longs === Number ? new $util.LongBits(message.totalQty.low >>> 0, message.totalQty.high >>> 0).toNumber() : message.totalQty;
            if (message.positionQty != null && message.hasOwnProperty("positionQty"))
                if (typeof message.positionQty === "number")
                    object.positionQty = options.longs === String ? String(message.positionQty) : message.positionQty;
                else
                    object.positionQty = options.longs === String ? $util.Long.prototype.toString.call(message.positionQty) : options.longs === Number ? new $util.LongBits(message.positionQty.low >>> 0, message.positionQty.high >>> 0).toNumber() : message.positionQty;
            if (message.prePositionQty != null && message.hasOwnProperty("prePositionQty"))
                if (typeof message.prePositionQty === "number")
                    object.prePositionQty = options.longs === String ? String(message.prePositionQty) : message.prePositionQty;
                else
                    object.prePositionQty = options.longs === String ? $util.Long.prototype.toString.call(message.prePositionQty) : options.longs === Number ? new $util.LongBits(message.prePositionQty.low >>> 0, message.prePositionQty.high >>> 0).toNumber() : message.prePositionQty;
            if (message.currentTime != null && message.hasOwnProperty("currentTime"))
                if (typeof message.currentTime === "number")
                    object.currentTime = options.longs === String ? String(message.currentTime) : message.currentTime;
                else
                    object.currentTime = options.longs === String ? $util.Long.prototype.toString.call(message.currentTime) : options.longs === Number ? new $util.LongBits(message.currentTime.low >>> 0, message.currentTime.high >>> 0).toNumber() : message.currentTime;
            return object;
        };
    
        /**
         * Converts this FuturesQuoteFullDataBase to JSON.
         * @function toJSON
         * @memberof FuturesQuoteFullDataBase
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FuturesQuoteFullDataBase.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return FuturesQuoteFullDataBase;
    })();
    
    $root.google = (function() {
    
        /**
         * Namespace google.
         * @exports google
         * @namespace
         */
        var google = {};
    
        google.protobuf = (function() {
    
            /**
             * Namespace protobuf.
             * @memberof google
             * @namespace
             */
            var protobuf = {};
    
            protobuf.Any = (function() {
    
                /**
                 * Properties of an Any.
                 * @memberof google.protobuf
                 * @interface IAny
                 * @property {string|null} [type_url] Any type_url
                 * @property {Uint8Array|null} [value] Any value
                 */
    
                /**
                 * Constructs a new Any.
                 * @memberof google.protobuf
                 * @classdesc Represents an Any.
                 * @implements IAny
                 * @constructor
                 * @param {google.protobuf.IAny=} [properties] Properties to set
                 */
                function Any(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Any type_url.
                 * @member {string} type_url
                 * @memberof google.protobuf.Any
                 * @instance
                 */
                Any.prototype.type_url = "";
    
                /**
                 * Any value.
                 * @member {Uint8Array} value
                 * @memberof google.protobuf.Any
                 * @instance
                 */
                Any.prototype.value = $util.newBuffer([]);
    
                /**
                 * Creates a new Any instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.IAny=} [properties] Properties to set
                 * @returns {google.protobuf.Any} Any instance
                 */
                Any.create = function create(properties) {
                    return new Any(properties);
                };
    
                /**
                 * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.IAny} message Any message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Any.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.IAny} message Any message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Any.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Any message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Any} Any
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Any.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.type_url = reader.string();
                            break;
                        case 2:
                            message.value = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Any message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Any} Any
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Any.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Any message.
                 * @function verify
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Any.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        if (!$util.isString(message.type_url))
                            return "type_url: string expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                            return "value: buffer expected";
                    return null;
                };
    
                /**
                 * Creates an Any message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Any} Any
                 */
                Any.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Any)
                        return object;
                    var message = new $root.google.protobuf.Any();
                    if (object.type_url != null)
                        message.type_url = String(object.type_url);
                    if (object.value != null)
                        if (typeof object.value === "string")
                            $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                        else if (object.value.length)
                            message.value = object.value;
                    return message;
                };
    
                /**
                 * Creates a plain object from an Any message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.Any} message Any
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Any.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type_url = "";
                        if (options.bytes === String)
                            object.value = "";
                        else {
                            object.value = [];
                            if (options.bytes !== Array)
                                object.value = $util.newBuffer(object.value);
                        }
                    }
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        object.type_url = message.type_url;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                    return object;
                };
    
                /**
                 * Converts this Any to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Any
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Any.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Any;
            })();
    
            return protobuf;
        })();
    
        return google;
    })();

    return $root;
});
