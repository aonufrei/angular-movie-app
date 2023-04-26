interface NavbarOption {
  id: number,
  label: string,
  routingUrl: string,
  selected: boolean,
}

const createNavbarOption = (id: number, label: string, routingUrl: string): NavbarOption => {
  return {
    id,
    label: label,
    routingUrl,
    selected: false
  }
}

export {NavbarOption, createNavbarOption}

