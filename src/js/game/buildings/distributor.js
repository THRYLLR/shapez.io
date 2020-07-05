import { defaultBuildingVariant, MetaBuilding } from "../meta_building";
import { GameRoot } from "../root";
import { formatItemsPerSecond } from "../../core/utils";
import { T } from "../../translations";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { enumItemProcessorTypes, ItemProcessorComponent } from "../components/item_processor";
import { Vector, enumDirection } from "../../core/vector";
import { enumHubGoalRewards } from "../tutorial_goals";
import { enumItemType } from "../base_item";
import { Entity } from "../entity";

export class MetaDistributorBuilding extends MetaBuilding {
    constructor() {
        super("distributor");
    }

    getDimensions() {
        return new Vector(1, 1);
    }

    getSilhouetteColor() {
        return "#7dcdc6";
    }

    /**
     * @param {GameRoot} root
     */
    getIsUnlocked(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_distributor);
    }

    /**
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root, variant) {
        const speed = root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.distributor);
        return [[T.ingame.buildingPlacement.infoTexts.speed, formatItemsPerSecond(speed)]];
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new ItemProcessorComponent({
                inputsPerCharge: 1,
                processorType: enumItemProcessorTypes.distributor,
            })
        );

        entity.addComponent(
            new ItemEjectorComponent({
                slots: [
                    { pos: new Vector(0, 0), direction: enumDirection.top },
                    { pos: new Vector(0, 0), direction: enumDirection.right },
                    { pos: new Vector(0, 0), direction: enumDirection.bottom },
                    { pos: new Vector(0, 0), direction: enumDirection.left },
                ],
            })
        );
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.top],
                    },
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.right],
                    },
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.bottom],
                    },
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.left],
                    },
                ],
            })
        );
    }
}
