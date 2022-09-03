import { OrderStatusInput, OrderStatusUpdateInput } from "@ts-types/generated";
import Base from "./base";

class Marketing extends Base<OrderStatusInput, OrderStatusUpdateInput> {}

export default new Marketing();
