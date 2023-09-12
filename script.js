const ENTITY_TEMPLATE = `
<h1 class="entity-name"></h1>
<section class="form-container">
    <div class="entityMemberContainer"></div>
    <div class="sub-entity-row">
        <input class="sub-entity-input" placeholder="Member Name" type="text"/>
        <select class="sub-entity-type-input" type="text"></select>
        <span class="ownership-row">
            <input class="sub-ownership-input" placeholder="Member Ownership" type="number"/>
        </span>
        <button class="addMemberToEntityButton">+ Add Entity Member</button>
        <button class="addSubEntityButton">+ Add Sub Entity</button>
    </div>
    <div class="sub-entities-container"></div>
</section>
`;

document.getElementById("sub-entity-adder").innerHTML = ENTITY_TEMPLATE;

const init = () => {
  // Constants

  const ENTITY_NAME = "Barış LLC";
  document.querySelector(".entity-name").textContent = ENTITY_NAME;

  let subEntityCounter = 0;

  const ENTITY_OPTIONS = [
    { value: "", text: "Member Type" },
    { value: "llc", text: "LLC" },
    { value: "corporation", text: "Corporation" },
    { value: "trust", text: "Trust" },
    { value: "nonguarantormember", text: "Non Guarantor Member" },
  ];

  // Templates

  function generateSubEntityInputTemplate(id) {
    return `
<div class="sub-entity" data-id="${id}">
  <span class="member-input-row">
    <input placeholder="Sub Entity Name" class="sub-entity-input" type="text" name="subEntity-${id}" />
    <button class="addMemberButton">+ Add  Member</button>
    <button class="removeButton">⊖</button>
    <button class="addSubEntityButton">+ Add Another Sub Entity</button>
  </span>
<div class="members-container"></div>
        `;
  }

  function generateMemberTemplate(subEntityId, memberId) {
    return `
<div class="member">
  <input placeholder="Sub Member Name" class="member-input" type="text" name="subEntity-${subEntityId}-member-${memberId}" />
  <select class="entity-type-input" type="text" name="subEntity-${subEntityId}-member-${memberId}" >
    <option value="">Sub Member Type</option>
    ${ENTITY_OPTIONS.map(
      (option) => `<option value="${option.value}">${option.text}</option>`
    ).join("")}
  </select>
  <span class="ownership-row">
    <input placeholder="Ownership" class="sub-ownership-input" type="number" name="subEntity-${subEntityId}-member-${memberId}" />
  </span>
  <button class="removeMemberButton">⊖</button>
</div>
<div class="sub-members-container"></div>
`;
  }

  function generateEntityMemberTemplate(
    ENTITY_NAME,
    memberName,
    memberType,
    memberOwnership
  ) {
    return `
<div class="entityMember">
    <input placeholder="Member Name" class="member-input" type="text" name="member-${ENTITY_NAME}" value="${memberName}" />
    <select class="entity-type-input" type="text" name="member-${ENTITY_NAME}" >
      <option value="">Member Type</option>
      ${ENTITY_OPTIONS.map(
        (option) =>
          `<option value="${option.value}" ${
            option.value === memberType ? "selected" : ""
          }>${option.text}</option>`
      ).join("")}
  </select>
  <span class="ownership-row">
    <input placeholder="Ownership" class="ownership-input"  type="number" name="member-${ENTITY_NAME}" value="${memberOwnership}" />
  </span>
  <button class="removeEntityMemberButton">⊖</button>
</div>
<div class="sub-members-container"></div>
`;
  }

  // Functions

  populateOptions(
    document.querySelector(".sub-entity-type-input"),
    ENTITY_OPTIONS
  );

  function populateOptions(selectElement, optionsArray) {
    optionsArray.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      selectElement.appendChild(optionElement);
    });
  }

  document
    .getElementById("sub-entity-adder")
    .addEventListener("click", function (event) {
      switch (true) {
        case event.target.classList.contains("addSubEntityButton"):
          addSubEntity();
          break;
        case event.target.classList.contains("addMemberToEntityButton"):
          addMemberToEntity();
          break;
        case event.target.classList.contains("addMemberButton"):
          addSubEntityMember(event);
          break;
        case event.target.classList.contains("removeButton"):
          removeElement(event, ".sub-entity");
          break;
        case event.target.classList.contains("removeMemberButton"):
          removeElement(event, ".member");
          break;
        case event.target.classList.contains("removeEntityMemberButton"):
          removeElement(event, ".entityMember");
          break;
      }
    });

  function addSubEntity() {
    const subEntitiesContainer = document.querySelector(
      ".sub-entities-container"
    );
    subEntitiesContainer.insertAdjacentHTML(
      "beforeend",
      generateSubEntityInputTemplate(subEntityCounter++)
    );
  }

  function addMemberToEntity() {
    const memberName = getValueAndReset(".sub-entity-input");
    const memberType = getValueAndReset(".sub-entity-type-input");
    const memberOwnership = getValueAndReset(".sub-ownership-input");

    if (!memberName || !memberType || !memberOwnership) {
      alert("Please fill all the fields");
      return;
    }

    const entityMemberContainer = document.querySelector(
      ".entityMemberContainer"
    );
    entityMemberContainer.insertAdjacentHTML(
      "beforeend",
      generateEntityMemberTemplate(
        ENTITY_NAME,
        memberName,
        memberType,
        memberOwnership
      )
    );
  }

  function addSubEntityMember(event) {
    const subEntity = event.target.closest(".sub-entity");
    const memberId = subEntity.dataset.memberCounter || 0;
    const membersContainer = subEntity.querySelector(".members-container");

    if (!subEntity.dataset.id) {
      alert("Please add a sub entity first");
      return;
    }

    membersContainer.insertAdjacentHTML(
      "beforeend",
      generateMemberTemplate(subEntity.dataset.id, memberId)
    );
    subEntity.dataset.memberCounter = Number(memberId) + 1;
  }

  function removeElement(event, selector) {
    const element = event.target.closest(selector);
    element.remove();
  }

  function getValueAndReset(selector) {
    const input = document.querySelector(selector);
    const value = input.value;
    input.value = "";
    return value;
  }
};

document.addEventListener("DOMContentLoaded", init);
