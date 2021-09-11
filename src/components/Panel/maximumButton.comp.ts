import { SetStateArgsType } from "@/composition/common";
import { EmitFnType } from "@/composition/types";
import { BoxBoundryOffset, Position, PositionType } from "./thePanel.compo";


export function makeMaximumPanelHandler(
  emit: EmitFnType<SetStateArgsType<PositionType>>,
  emitType: string = Position.emitType,
  boxBoundry: number = BoxBoundryOffset
) {
  return function (): void {
    emit(emitType, {
      top: boxBoundry,
      left: boxBoundry,
      right: boxBoundry,
      bottom: boxBoundry
    })
  }
}