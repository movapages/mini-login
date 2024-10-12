import {defineArrayMember, defineField, defineType} from "sanity";

// https://schema.club/E97cTJ1G

export const UserRole = defineType({
  type: "document",
  name: "UserRole",
  title: "User Role",
  fields: [
    defineField({
      type: "string",
      name: "RoleId",
      title: "Role ID",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "RoleName",
      title: "Role Name",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "RolePermissions",
      title: "Role Permissions",
      options : {
        list: [
          {title: "Create Event", value: "CreateEvent"},
          {title: "Edit Event", value: "EditEvent"},
          {title: "Delete Event", value: "DeleteEvent"},
        ]
      },
    }),
  ],
});


export const UserAccount = defineType({
  type: "document",
  name: "UserAccount",
  title: "User Account",
  fields: [
    defineField({
      type: "string",
      name: "UserId",
      title: "User ID",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "Username",
      title: "Username",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "PasswordHash",
      title: "Password Hash",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "reference",
      name: "UserRole",
      title: "User Role",
      to: [{ type: "UserRole" }],
      validation: (e) => e.required(),
    }),
    defineField({
      type: "boolean",
      name: "IsActive",
      title: "Is Active",
      validation: (e) => e.required(),
    }),
  ],
});


// export const AdminPanel = defineType({
//   type: "object",
//   name: "AdminPanel",
//   title: "Admin Panel",
//   fields: [
//     defineField({
//       type: "string",
//       name: "PanelId",
//       title: "Panel ID",
//       validation: (e) => e.required(),
//     }),
//     defineField({
//       type: "array",
//       name: "AdminFeatures",
//       title: "Admin Features",
//       of: [
//         defineArrayMember({ type: "UserManagement" }),
//         defineArrayMember({ type: "SystemSettings" }),
//       ],
//     }),
//     defineField({
//       type: "array",
//       name: "AccessibleBy",
//       title: "Accessible By",
//       of: [
//         defineArrayMember({ type: "reference", to: [{ type: "UserRole" }] }),
//       ],
//     }),
//   ],
// });
