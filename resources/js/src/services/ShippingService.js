// ShippingService.js
import axios from "axios";
import { State } from "country-state-city";
import { easyParcelRate as easyParcelRateApi} from "../Api";

const API = process.env.REACT_APP_API_URL;

export default class ShippingService {
    constructor(currentLanguage) {
        this.currentLanguage = currentLanguage;
        this.stateMap = {
            Johor: "jhr",
            Kedah: "kdh",
            Kelantan: "ktn",
            Melaka: "mlk",
            "Negeri Sembilan": "nsn",
            Pahang: "phg",
            Perak: "prk",
            Perlis: "pls",
            "Pulau Pinang": "png",
            Selangor: "sgr",
            Terengganu: "trg",
            "Kuala Lumpur": "kul",
            "Putra Jaya": "pjy",
            Sarawak: "srw",
            Sabah: "sbh",
            Labuan: "lbn",
        };
    }

 async getShippingDimensions(cartValues) {
        let obj = {
            _length: 0,
            _weight: 0,
            _quantity: 0,
            _height: 0,
            _actualWeight: 0,
            _totalWeight: 0,
        };

        cartValues.forEach((item) => {
            if (item.productType !== "aws3-bucket-product") {
                obj._quantity += parseInt(item.quantity);
                obj._length += parseFloat(item.dimension_length || 0);
                obj._weight += parseFloat(item.dimension_weight || 0);
                obj._height += parseFloat(item.dimension_height || 0);
                obj._actualWeight += parseFloat(
                    item.product_actual_weight || 0
                );
                obj._totalWeight +=
                    parseFloat(item.product_actual_weight || 0) *
                    parseInt(item.quantity);
            }
        });

        // Fixing decimal points
        obj._length = obj._length.toFixed(2);
        obj._weight = obj._weight.toFixed(2);
        obj._height = obj._height.toFixed(2);
        obj._actualWeight = obj._actualWeight.toFixed(2);
        obj._totalWeight = obj._totalWeight.toFixed(2);

        return obj;
    }

    async easyParcelRate(shipParam) {
        try {
            const response = await easyParcelRateApi(shipParam);
            return response.data;
        } catch (error) {
            console.error("EasyParcel API error:", error);
            throw error;
        }
    }

    async calculateShipping(data) {
        try {
            const response = await axios.post(`${API}shipping-rates`, data);
            return response.data;
        } catch (error) {
            console.error("Shipping rates API error:", error);
            throw error;
        }
    }

    async getShippingData(
        type,
        dimensions,
        authData,
        cartValues,
        billingGetValues
    ) {
        if (this.currentLanguage === "en_MY") {
            return this.getEasyParcelData(
                type,
                dimensions,
                authData,
                cartValues,
                billingGetValues
            );
        } else {
            return this.getEasyShipData(
                type,
                dimensions,
                authData,
                cartValues,
                billingGetValues
            );
        }
    }

    async getEasyParcelData(
        type,
        dimensions,
        authData,
        cartValues,
        billingGetValues
    ) {
        const data = {
            contact_name: authData?.id ? authData.name : "",
            contact_email: authData?.id
                ? authData.email
                : "info@scoliolife.com",
            parcels_box_length: dimensions._length,
            parcels_box_width: dimensions._weight,
            parcels_box_height: dimensions._height,
            items_quantity: dimensions._quantity,
            items_description: cartValues?.[0]?.title || "Health & Beauty Item",
            items_category: "Health & Beauty",
            items_declared_currency: "SGD",
            items_actual_weight: dimensions._actualWeight,
            items_declared_customs_value: 1,
            total_actual_weight: dimensions._totalWeight,
        };

        let shippingCountry, shippingState, shippingPin;

        if (type === "billing") {
            shippingCountry = billingGetValues("country") || "";
            shippingState = billingGetValues("state") || "Lorem";
            shippingPin = billingGetValues("postcode") || "12345";
        } else if (type === "new") {
            const address = localStorage.getItem("shippingCartAddress")
                ? JSON.parse(localStorage.getItem("shippingCartAddress"))
                : {};
            shippingCountry =
                billingGetValues("country") || address?.country_alpha2;
            shippingState = billingGetValues("state") || address?.state;
            shippingPin = billingGetValues("postcode") || address?.postal_code;
        } else {
            shippingCountry = billingGetValues("shippingCountry") || "";
            shippingState = billingGetValues("shippingState") || "Lorem";
            shippingPin = billingGetValues("shippingPostcode") || "12345";
        }

        // Convert full state name to EasyParcel short code
        const mappedState = this.stateMap[shippingState] || shippingState;

        const shipParam = [
            {
                send_code: shippingPin,
                send_state: mappedState,
                send_country: shippingCountry,
                weight: data.items_actual_weight / 1000, // Convert grams to kg
            },
        ];

        const shippingData = await this.easyParcelRate(shipParam);
        return shippingData.result.flatMap((entry) =>
            entry.rates.filter((item) => item.service_detail === "pickup")
        );
    }

    async getEasyShipData(
        type,
        dimensions,
        authData,
        cartValues,
        billingGetValues
    ) {
        const data = {
            contact_name: authData && authData.id ? authData.name : "",
            contact_email:
                authData && authData.id
                    ? authData.email
                    : "info@scoliolife.com",
            parcels_box_length: dimensions._length,
            parcels_box_width: dimensions._weight,
            parcels_box_height: dimensions._height,
            items_quantity: dimensions._quantity,
            items_description: cartValues[0]?.title,
            items_category: "Health & Beauty",
            items_declared_currency: "SGD",
            items_actual_weight: dimensions._actualWeight,
            items_declared_customs_value: 1,
            total_actual_weight: dimensions._totalWeight,
        };

        if (type == "billing") {
            data["country_alpha2"] = billingGetValues("country")
                ? billingGetValues("country")
                : "";
            data["state"] = billingGetValues("state")
                ? billingGetValues("state")
                : "Lorem";
            data["city"] = billingGetValues("town")
                ? billingGetValues("town")
                : "Lorem";
            data["postal_code"] = billingGetValues("postcode")
                ? billingGetValues("postcode")
                : "12345";
        } else if (type == "new") {
            const address = localStorage.getItem("shippingCartAddress")
                ? JSON.parse(localStorage.getItem("shippingCartAddress"))
                : "";
            data["country_alpha2"] = billingGetValues("country")
                ? billingGetValues("country")
                : address?.country_alpha2;
            data["state"] = billingGetValues("state")
                ? billingGetValues("state")
                : address?.state;
            data["city"] = billingGetValues("town")
                ? billingGetValues("town")
                : address?.city;
            data["postal_code"] = billingGetValues("postcode")
                ? billingGetValues("postcode")
                : address?.postal_code;
        } else {
            data["country_alpha2"] = billingGetValues("shippingCountry")
                ? billingGetValues("shippingCountry")
                : "";
            data["state"] = billingGetValues("shippingState")
                ? billingGetValues("shippingState")
                : "Lorem";
            data["city"] = billingGetValues("shippingTown")
                ? billingGetValues("shippingTown")
                : "Lorem";
            data["postal_code"] = billingGetValues("shippingPostcode")
                ? billingGetValues("shippingPostcode")
                : "12345";
        }

        return await this.calculateShipping(data);
    }

    handleShippingSelection(
        pickupCouriers,
        setSelectedOption,
        setShippigCharges
    ) {
        if (pickupCouriers.length > 0) {
            const selectedCourier = pickupCouriers[0];

            if (!localStorage.getItem("checkAddressSelect")) {
                localStorage.setItem(
                    "checkAddressSelect",
                    JSON.stringify(selectedCourier)
                );
            } else {
                const isCourierPresent = pickupCouriers.some(
                    (courier) =>
                        courier.courier_id ===
                        JSON.parse(localStorage.getItem("checkAddressSelect"))
                            ?.courier_id
                );

                if (isCourierPresent) {
                    setSelectedOption(
                        JSON.parse(localStorage.getItem("checkAddressSelect"))
                    );
                    setShippigCharges(
                        parseFloat(
                            JSON.parse(
                                localStorage.getItem("checkAddressSelect")
                            )?.price
                        )
                    );
                } else {
                    localStorage.removeItem("checkAddressSelect");
                    localStorage.removeItem("shippingData");
                    setShippigCharges(parseFloat(selectedCourier.price));
                    setSelectedOption(selectedCourier);
                }
            }

            localStorage.setItem(
                "shippingData",
                JSON.stringify(pickupCouriers)
            );
            return pickupCouriers;
        }
        return null;
    }
}
