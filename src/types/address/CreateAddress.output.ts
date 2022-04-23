import { Address } from "../../entities/address/address.entity";

export interface CreateAddressOutput {
  success: boolean;
  address?: Address;
  error?: string;
}
