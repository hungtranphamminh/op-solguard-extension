/* TODO: separate into different entries */

/* Types and Interfaces for shop to extension communication(S2E) */

export interface Message{
    action:S2ERequestAction | S2EResponseAction | undefined,
    data: S2EMessageData
}

export interface S2ERequestMessage{
    action:S2ERequestAction |undefined,
    data:S2ERequestData | undefined
}

export interface S2EResponseMessage{
    action:S2EResponseAction |undefined,
    data:S2EResponseData | undefined
}

export type S2EMessageData = S2ERequestData | S2EResponseData | undefined

export type S2ERequestData = S2EPopupRequest
export type S2EResponseData = S2EPopupResponse

export interface S2EPopupResponse{
    id:string
}

export interface S2EPopupRequest {
    totalPrice:string,
    origin:string,
    id:string
}

export enum S2ERequestAction {
    OpenPopup = "Open popup",
    Init = "Init port connection"
}

export enum S2EResponseAction {
    ConfirmInit = "Connection confirm"
}

/* Types and Interfaces for extension to extension communication(E2E) */
export interface E2EMessage{
    action:E2ERequestAction | E2EResponseAction | undefined,
    data: E2EMessageData
}

export interface E2ERequestMessage{
    action:E2ERequestAction |undefined,
    data:E2ERequestData | undefined
}

export interface E2EResponseMessage{
    action:E2EResponseAction |undefined,
    data:E2EResponseData | undefined
}


type E2EMessageData = E2ERequestData | E2EResponseData | undefined

interface E2ECompulsoryData {
    id:string
}

export type E2ERequestData = (E2EPaymentRequest) & E2ECompulsoryData
export type E2EResponseData = (undefined) & E2ECompulsoryData

export interface E2EPaymentRequest{
    amount:number
    address:string
}

export enum E2ERequestAction {
    REQUEST_PAYMENT = "REQUEST_PAYMENT"
}

export enum E2EResponseAction {
}



